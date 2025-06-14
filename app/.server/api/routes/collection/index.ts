import { router } from "../../trpc";
import { products } from "./products";

export const collectionsRouter = router({
    products
});
