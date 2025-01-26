"use server";

import type { ProductType } from "@/types/product";
import { getProductsSchema } from "@/actions/getProducts";

export const getProducts = async ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}): Promise<ProductType[]> => {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,description,price,thumbnail,reviews,availabilityStatus,rating`
  );

  return getProductsSchema.parse(await res.json()).products;
};
