import { db } from "@repo/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";
import { protectedProcedure, router } from "../lib/trpc";

export const zapRouter = router({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const zaps = await db.zap.findMany({
			where: {
				userId: ctx.session.user.id,
			},
		});

		if (!zaps) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "No zaps found",
			});
		}

		return zaps;
	}),

	getOne: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			const zap = await db.zap.findUnique({
				where: { id: input.id, userId: ctx.session.user.id },
				include: {
					zapTrigger: true,
					zapActions: true,
				},
			});

			if (!zap) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Zap not found",
				});
			}

			return zap;
		}),

	create: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1, "Name is required"),
				description: z.string().optional(),
				triggerId: z.string().min(1, "Trigger id is required"),
				triggerMetadata: z.record(z.string(), z.any()).optional(),
				actions: z
					.array(
						z.object({
							actionId: z.string().min(1, "Action id is required"),
							metadata: z.record(z.string(), z.any()).optional(),
						}),
					)
					.nonempty("At least one action is required"),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const createdZap = await db.$transaction(async (tx) => {
				const zap = await tx.zap.create({
					data: {
						name: input.name,
						description: input.description,
						zapActions: {
							create: input.actions.map((action, index) => ({
								actionId: action.actionId,
								metadata: action.metadata,
								sortingOrder: index + 1,
							})),
						},
						userId: ctx.session.user.id,
					},
				});

				const trigger = await tx.zapTrigger.create({
					data: {
						zapId: zap.id,
						triggerId: input.triggerId,
						metadata: input.triggerMetadata,
					},
				});

				await tx.zap.update({
					where: { id: zap.id },
					data: {
						zapTrigger: {
							connect: {
								id: trigger.id,
							},
						},
					},
				});

				return zap;
			});

			return createdZap;
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input }) => {
			const zap = await db.zap.delete({
				where: { id: input.id },
			});

			return zap;
		}),
});
