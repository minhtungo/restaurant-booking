import { createTRPCRouter } from "@/server/api/trpc";
import { menuRouter } from "@/server/api/routers/menu";
import { adminRouter } from "@/server/api/routers/admin";
import { openingRouter } from "@/server/api/routers/opening";
import { checkoutRouter } from "@/server/api/routers/checkout";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  menu: menuRouter,
  admin: adminRouter,
  opening: openingRouter,
  checkout: checkoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
