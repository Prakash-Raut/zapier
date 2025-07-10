import type { Prisma } from "@repo/db";

import { db } from "@repo/db";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
	clientId: "zap-worker",
	brokers: ["localhost:9092"],
});

async function withRetry<T>(
	fn: () => Promise<T>,
	label: string,
	retries = 3,
	delay = 1000,
): Promise<T> {
	let attempt = 0;
	while (attempt < retries) {
		try {
			return await fn();
		} catch (err) {
			attempt++;
			console.warn(`⚠️ ${label} failed (attempt ${attempt}/${retries}):`, err);
			if (attempt === retries) throw err;
			await new Promise((r) => setTimeout(r, delay));
		}
	}
	throw new Error(`${label} failed after ${retries} retries`);
}

async function main() {
	const consumer = kafka.consumer({ groupId: "zap-group" });
	const producer = kafka.producer();

	try {
		await withRetry(() => consumer.connect(), "Kafka Consumer Connect");
		await withRetry(() => producer.connect(), "Kafka Producer Connect");
		console.log("✅ Kafka connected");
	} catch (err) {
		console.error("❌ Kafka connection failed:", err);
		process.exit(1);
	}

	await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

	await consumer.run({
		autoCommit: false,
		eachMessage: async ({ topic, partition, message }) => {
			const rawValue = message.value?.toString();
			console.log("📥 Received:", {
				topic,
				partition,
				offset: message.offset,
				value: rawValue,
			});

			if (!rawValue) {
				console.warn("⚠️ Empty message. Skipping...");
				return;
			}

			let parsedValue: { zapRunId: string; stage: number };
			try {
				parsedValue = JSON.parse(rawValue);
			} catch (err) {
				console.error("❌ Failed to parse Kafka message:", err);
				return;
			}

			const { zapRunId, stage } = parsedValue;

			let zapRunDetails: Prisma.ZapRunGetPayload<{
				include: {
					zap: {
						include: {
							actions: {
								include: {
									type: true;
								};
							};
						};
					};
				};
			}> | null;

			try {
				zapRunDetails = await withRetry(
					() =>
						db.zapRun.findFirst({
							where: { id: zapRunId },
							include: {
								zap: {
									include: {
										actions: {
											include: { type: true },
										},
									},
								},
							},
						}),
					"Fetch ZapRun",
				);
			} catch (err) {
				console.error("❌ Failed to fetch zapRun:", err);
				return;
			}

			if (!zapRunDetails) {
				console.warn("⚠️ ZapRun not found:", zapRunId);
				return;
			}

			const currentAction = zapRunDetails.zap.actions.find(
				(x) => x.sortingOrder === stage,
			);

			if (!currentAction) {
				console.warn("⚠️ No matching action for stage", stage);
				return;
			}

			console.log("⚙️ Executing action:", currentAction.id);
			await new Promise((r) => setTimeout(r, 500)); // simulate work

			const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;

			if (stage < lastStage) {
				try {
					await withRetry(
						() =>
							producer.send({
								topic: TOPIC_NAME,
								messages: [
									{
										value: JSON.stringify({
											stage: stage + 1,
											zapRunId,
										}),
									},
								],
							}),
						"Kafka Re-queue",
					);

					console.log("🔁 Re-queued for next stage");
				} catch (err) {
					console.error("❌ Failed to re-queue next stage:", err);
					return;
				}
			}

			try {
				await consumer.commitOffsets([
					{
						topic,
						partition,
						offset: (Number.parseInt(message.offset) + 1).toString(),
					},
				]);
				console.log("✅ Offset committed");
			} catch (err) {
				console.error("❌ Failed to commit offset:", err);
			}
		},
	});
}

main().catch((err) => {
	console.error("❌ Worker crashed:", err);
	process.exit(1);
});
