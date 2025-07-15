import { db } from "@repo/db";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
	clientId: "zap-worker",
	brokers: ["localhost:9092"],
});

async function main() {
	const consumer = kafka.consumer({ groupId: "zap-group" });
	const producer = kafka.producer();

	await consumer.connect();
	await producer.connect();

	console.log("✅ Kafka connected");

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

			const parsedValue = JSON.parse(rawValue);

			const { zapRunId, stage } = parsedValue;

			const zapRunDetails = await db.zapRun.findFirst({
				where: { id: zapRunId },
				include: {
					zap: {
						include: {
							zapActions: {
								include: { type: true },
							},
						},
					},
				},
			});

			if (!zapRunDetails) {
				console.warn("⚠️ ZapRun not found:", zapRunId);
				return;
			}

			const currentAction = zapRunDetails.zap.zapActions.find(
				(x) => x.sortingOrder === stage,
			);

			if (!currentAction) {
				console.warn("⚠️ No matching action for stage", stage);
				return;
			}

			if (currentAction.type.id === "email") {
				console.log("Sending Email");
				await new Promise((r) => setTimeout(r, 1000));
			}

			if (currentAction.type.id === "send-sol") {
				console.log("Sending SOL");
				await new Promise((r) => setTimeout(r, 1000));
			}

			await new Promise((r) => setTimeout(r, 500));

			const lastStage = (zapRunDetails?.zap.zapActions?.length || 1) - 1;

			if (lastStage !== stage) {
				console.log("Pushing Back to Queue");

				await producer.send({
					topic: TOPIC_NAME,
					messages: [
						{
							value: JSON.stringify({
								stage: stage + 1,
								zapRunId,
							}),
						},
					],
				});

				console.log("Processing Done");

				await consumer.commitOffsets([
					{
						topic,
						partition,
						offset: (Number.parseInt(message.offset) + 1).toString(),
					},
				]);
			}
		},
	});
}

main().catch((err) => {
	console.error("❌ Worker crashed:", err);
	process.exit(1);
});
