import { trpcServer } from "@hono/trpc-server";
import { db } from "@repo/db";
import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";

const app = new Hono();

app.use(logger());
app.use(
	"/*",
	cors({
		origin: process.env.CORS_ORIGIN || "",
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext: (_opts, context) => {
			return createContext({ context });
		},
	}),
);

app.get("/", (c) => {
	return c.text("OK");
});

app.post("/hooks/catch/:userId/:zapId", async (c) => {
	const { userId, zapId } = c.req.param();
	const body = await c.req.json();

	await db.$transaction(async (tx) => {
		const zapRun = await tx.zapRun.create({
			data: {
				zapId,
				metadata: body,
			},
		});

		await tx.zapRunOutbox.create({
			data: {
				zapRunId: zapRun.id,
			},
		});
	});

	return c.text("Webhook received", 200);
});

export default app;
