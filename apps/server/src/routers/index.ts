import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { actionRouter } from "./action";
import { triggerRouter } from "./trigger";
import { zapRouter } from "./zap";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
	zap: zapRouter,
	action: actionRouter,
	trigger: triggerRouter,
});

export type AppRouter = typeof appRouter;

// export const caller = appRouter.createCaller({});
