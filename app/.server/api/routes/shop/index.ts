import { router } from "~/.server/api/trpc";

import { all } from "./all";
import { bySlug } from "./bySlug";

export const shopRouter = router({
  all,
  bySlug,
});
