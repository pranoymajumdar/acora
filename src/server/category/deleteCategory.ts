"use server";

import { err, ok, type ActionResult } from "@/lib/actionResult";
import { db } from "@/lib/db";
import { checkCategoryExistence } from "./internal";
import { logger } from "@/lib/logger";
import { uuidSchema, type UUIDSchema } from "@/zod-schemas/uuid";

const log = logger.child({ module: "server-action:deleteCategory" });

export const deleteCategoryAction = async (unsafeData: UUIDSchema): ActionResult<null> => {
  const parsed = uuidSchema.safeParse(unsafeData);
  if (!parsed.success) return err("Validation error");
  try {
    if (!(await checkCategoryExistence("id", parsed.data))) return err("Invalid category.");

    await db.category.delete({
      where: {
        id: parsed.data,
      },
    });
    return ok(null);
  } catch (error) {
    log.error(error);
    return err("Internal Server Error.");
  }
};
