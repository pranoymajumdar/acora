import { Button } from "~/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/shared/components/ui/dropdown-menu";
import { LucideUser } from "lucide-react";
import { signOut, useSession } from "~/features/auth/lib/auth";
import { Link } from "react-router";

export const UserMenuDropdown = () => {
  const { data: session, error } = useSession();

  if (!session) {
    return (
      <Button asChild>
        <Link to="/sign-in">Login</Link>
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <LucideUser className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Orders</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
