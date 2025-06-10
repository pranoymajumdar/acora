import { Button, buttonVariants } from "~/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "~/shared/components/ui/dropdown-menu";
import {
  LucideCircleUserRound,
  LucideLayers,
  LucideLogOut,
  LucideUser,
} from "lucide-react";
import { signOut, useSession } from "~/features/auth/lib/auth";
import { Link, useLocation } from "react-router";

export const UserMenuDropdown = () => {
  const { data: session, isPending } = useSession();
  const location = useLocation();
  if (isPending) {
    return <Button size="icon" variant="ghost" loading={isPending} />;
  }

  if (!session) {
    return (
      <Link
        className={buttonVariants({
          size: "sm",
        })}
        to={`/sign-in?callbackUrl=${location.pathname}`}
      >
        Login
      </Link>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="Open account menu">
          <LucideCircleUserRound size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex flex-col">
          <span>Signed in as</span>
          <span className="text-foreground text-xs font-normal">
            {session.user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LucideUser />
            Manage Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LucideLayers />
            My Orders
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={() => signOut()}>
          <LucideLogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
