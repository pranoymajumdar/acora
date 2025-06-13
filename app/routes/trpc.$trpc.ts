import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "~/server/api/root";

import type { Route } from "./+types/trpc.$trpc";

export const loader = async (args: Route.LoaderArgs) => handleRequest(args);

export const action = async (args: Route.ActionArgs) => handleRequest(args);

function handleRequest(args: Route.LoaderArgs | Route.ActionArgs) {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: args.request,
    router: appRouter,
  });
}
