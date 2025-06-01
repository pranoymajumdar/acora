import { MainLayout } from "@/layouts/default";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <MainLayout>
      <HomePage />
    </MainLayout>
  ),
});

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello World
    </main>
  );
}
