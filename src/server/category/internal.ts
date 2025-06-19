import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export const checkCategoryExistence = async (by: "id" | "slug", value: string) => {
  const where: Prisma.CategoryWhereUniqueInput = by === "id" ? { id: value } : { slug: value };
  return !!(await db.category.findUnique({
    where,
  }));
};
