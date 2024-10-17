import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../../trpc/routers/_app";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
  });
};

export { handler as GET, handler as POST };