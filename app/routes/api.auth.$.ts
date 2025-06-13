import { auth } from "~/.server/auth/config";

import type { Route } from "./+types/api.auth.$";

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  return auth.handler(request);
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  return auth.handler(request);
}
