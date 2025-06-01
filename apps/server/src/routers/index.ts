import { publicProcedure, router } from "@/lib/trpc";
import { categoryRouter } from "./category";
import { productsRouter } from "./products";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  category: categoryRouter,
  products: productsRouter,
});
export type AppRouter = typeof appRouter;
