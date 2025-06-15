'use client';
import { LucideCircleAlert, LucideCircleUserRound, LucideLayers, LucideLoader2, LucideLogOut, LucideUser } from "lucide-react";


import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";



export function UserMenuDropdown() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter()
  if (isPending) {
    return <Button size='icon' variant='ghost'>
      <LucideLoader2 />
    </Button>
  }

  if (!data) {
    return <Button size='icon' variant='destructive'>
      <LucideCircleAlert />
    </Button>
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
          <span className="text-foreground text-xs font-normal">{data.user.email}</span>
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
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.refresh()
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
