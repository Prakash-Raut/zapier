import { db } from "@repo/db";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
	clientId: "zap-outbox",
	brokers: ["localhost:9092"],
});

async function main() {
	const producer = kafka.producer();
	await producer.connect();

	console.log("🚀 Outbox worker started");

	while (true) {
		const zapRunOutboxes = await db.zapRunOutbox.findMany({
			take: 10,
		});

		console.log("🔍 Found ZapRunOutboxes", zapRunOutboxes);

		producer.send({
			topic: TOPIC_NAME,
			messages: zapRunOutboxes.map((r) => ({
				value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 }),
			})),
		});

		console.log("✅ Kafka messages sent");

		await db.zapRunOutbox.deleteMany({
			where: {
				id: { in: zapRunOutboxes.map((x) => x.id) },
			},
		});

		console.log("🗑️ Outbox rows deleted");

		await new Promise((r) => setTimeout(r, 3000));
	}
}

main().catch((err) => {
	console.error("❌ Outbox worker failed to start:", err);
	process.exit(1);
});
