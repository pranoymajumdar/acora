import { LucideCircleUserRound, LucideLayers, LucideLogOut, LucideUser } from "lucide-react";
import { Link, useLocation, useRevalidator } from "react-router";

import type { SessionDataType } from "~/shared/types/getSession";

import { signOut } from "~/features/auth/lib/auth";
import { Button, buttonVariants } from "~/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";

function LoginButton() {
  const location = useLocation();
  return (
    <Link
      className={buttonVariants({
        size: "sm",
      })}
      to={`/auth?callbackUrl=${location.pathname}`}
    >
      Login
    </Link>
  );
}

export function UserMenuDropdown({ sessionData }: { sessionData: SessionDataType }) {
  const { revalidate } = useRevalidator();
  if (!sessionData)
    return <LoginButton />;

  const { user } = sessionData;
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
          <span className="text-foreground text-xs font-normal">{user.email}</span>
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
        <DropdownMenuItem
          variant="destructive"
          onSelect={async () => {
            await signOut({
              fetchOptions: {
                onSuccess: async () => {
                  await revalidate();
                },
              },
            });
          }}
        >
          <LucideLogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
