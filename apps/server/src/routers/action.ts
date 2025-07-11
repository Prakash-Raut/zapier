import { db } from "@repo/db";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../lib/trpc";

export const actionRouter = router({
	getAll: protectedProcedure.query(async () => {
		const actions = await db.zapAction.findMany({
			orderBy: {
				id: "asc",
			},
		});

		if (!actions) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "No available actions found",
			});
		}

		return actions;
	}),
});
