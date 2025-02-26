import { Container } from "~/components/ui/container";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <Container
      as="main"
      className="min-h-screen grid items-center justify-center py-8"
    >
      <Outlet />
    </Container>
  );
}
