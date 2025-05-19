import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { Link, useLocation } from "@tanstack/react-router";
import { LucideUser2 } from "lucide-react";
import { NavUser } from "../../shared/nav-user";

export const UserMenu = () => {
  const { pathname } = useLocation();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="h-9 w-24" />;
  }

  if (!session) {
    return (
      <Button variant="outline" asChild>
        <Link
          to="/auth"
          search={{
            redirectTo: pathname,
          }}
        >
          Sign In
        </Link>
      </Button>
    );
  }

  return (
    <NavUser user={session.user}>
      <Button variant="outline" size="icon">
        <LucideUser2 />
      </Button>
    </NavUser>
  );
};
