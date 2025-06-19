"use server";
import { err, ok, type ActionResult } from "@/lib/actionResult";
import { db } from "@/lib/db";
import { z } from "zod";

const payloadSchema = z.object({
  id: z.string().uuid(),
});

const checkCategoryExistence = async (id: string) =>
  !!(await db.category.findUnique({ where: { id } }));

export const deleteCategoryAction = async (
  unsafeData: z.infer<typeof payloadSchema>
): ActionResult<null> => {
  const parsed = payloadSchema.safeParse(unsafeData);
  if (!parsed.success) return err("Validation error");
  try {
    if (!(await checkCategoryExistence(parsed.data.id))) return err("Invalid category.");

    await db.category.delete({
      where: {
        id: parsed.data.id,
      },
    });
    return ok(null);
  } catch (error) {
    return err("Internal Server Error.");
  }
};
