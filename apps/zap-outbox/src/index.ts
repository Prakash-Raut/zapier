import { db } from "@repo/db";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
	clientId: "zap-outbox",
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
	const producer = kafka.producer();
	await withRetry(() => producer.connect(), "Kafka Producer Connect");

	console.log("🚀 Outbox worker started");

	while (true) {
		let pendingRows = [];

		try {
			pendingRows = await withRetry(
				() =>
					db.zapRunOutbox.findMany({
						where: {},
						take: 10,
					}),
				"DB Fetch",
			);

			if (pendingRows.length === 0) {
				await new Promise((r) => setTimeout(r, 3000));
				continue;
			}

			console.log(`📥 Found ${pendingRows.length} rows`);
		} catch (err) {
			console.error("❌ Final DB fetch failure:", err);
			await new Promise((r) => setTimeout(r, 3000));
			continue;
		}

		try {
			await withRetry(
				() =>
					producer.send({
						topic: TOPIC_NAME,
						messages: pendingRows.map((r) => ({
							value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 }),
						})),
					}),
				"Kafka Send",
			);

			console.log("✅ Kafka messages sent");
		} catch (err) {
			console.error(
				"❌ Kafka send failed after retries, skipping delete:",
				err,
			);
			continue; // Don't delete if send fails
		}

		try {
			await withRetry(
				() =>
					db.zapRunOutbox.deleteMany({
						where: {
							id: { in: pendingRows.map((x) => x.id) },
						},
					}),
				"DB Delete",
			);

			console.log("🗑️ Outbox rows deleted");
		} catch (err) {
			console.error("❌ DB delete failed after retries:", err);
			// Not continuing here; rows will be retried in next loop
		}

		await new Promise((r) => setTimeout(r, 3000));
	}
}

main().catch((err) => {
	console.error("❌ Outbox worker failed to start:", err);
	process.exit(1);
});
