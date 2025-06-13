import { getShops } from "~/features/shop/service";
import { publicProcedure, router } from "~/server/api/trpc";

export const shopRouter = router({
  all: publicProcedure.query(async () => {
    return await getShops();
  }),
});
