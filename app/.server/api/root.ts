import { collectionsRouter } from "./routes/collection";
import { shopRouter } from "./routes/shop";
import { router } from "./trpc";

export const appRouter = router({
  shop: shopRouter,
  collection: collectionsRouter
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
