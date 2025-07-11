import { db } from "@repo/db";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../lib/trpc";

export const triggerRouter = router({
	getAll: protectedProcedure.query(async () => {
		const triggers = await db.zapTrigger.findMany({
			orderBy: {
				id: "asc",
			},
		});

		if (!triggers) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "No available triggers found",
			});
		}

		return triggers;
	}),
});
