import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "~/.server/api/root";
import { createContext } from "~/.server/api/trpc";

import type { Route } from "./+types/api.trpc.$trpc";

export const loader = async (args: Route.LoaderArgs) => handleRequest(args);

export const action = async (args: Route.ActionArgs) => handleRequest(args);

function handleRequest(args: Route.LoaderArgs | Route.ActionArgs) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: args.request,
    router: appRouter,
    createContext,
  });
}
