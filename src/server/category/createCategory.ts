"use server";

import { createCategorySchema } from "@/zod-schemas/createCategory";
import { db } from "@/lib/db";
import { err, ok, type ActionResult } from "@/lib/actionResult";
import type { Category } from "@prisma/client";

const checkParentExistence = async (id: string) => {
  const parentCategory = await db.category.findUnique({ where: { id } });
  return !!parentCategory;
};

const checkCategoryExistence = async (slug: string) => {
  const category = await db.category.findUnique({
    where: { slug },
  });

  return !!category;
};

export const createCategoryAction = async (
  unsafeData: Record<string, unknown>
): ActionResult<Category> => {
  const parsed = createCategorySchema.safeParse(unsafeData);

  if (!parsed.success) return err("Validation failed");

  if (parsed.data.parentId && !(await checkParentExistence(parsed.data.parentId)))
    return err("Invalid parent category id.");

  if (await checkCategoryExistence(parsed.data.slug))
    return err("Category with the slug already exists.");

  try {
    const category = await db.category.create({
      data: parsed.data,
    });

    return ok(category);
  } catch (error) {
    return err("Internal server error.");
  }
};
