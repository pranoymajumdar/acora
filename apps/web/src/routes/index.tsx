import { MainLayout } from "@/layouts/default";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <MainLayout>
      <HomePage />
    </MainLayout>
  ),
});

function HomePage() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());

  return (
    <main>
      <h1>Status: {healthCheck.data}</h1>
    </main>
  );
}
