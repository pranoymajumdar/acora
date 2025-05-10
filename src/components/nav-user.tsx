"use client";
import { LucideLayoutDashboard, LucideLogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SessionUserType } from "@/lib/auth/core/session";
import { useRouter } from "next/navigation";

export const NavUser = ({ user }: { user: SessionUserType }) => {
  const router = useRouter();
  const getAvatarFallback = (): string => {
    const split = user.name.split(" ");
    return `${split[0].slice(0, 1)}${
      split.length > 0 ? split[1].slice(0, 1) : ""
    }`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="./avatar.jpg" alt="Profile image" />
          <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-min min-w-52">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {user.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.push("/dashboard")}>
            <LucideLayoutDashboard
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => router.push("/sign-out")}>
          <LucideLogOut size={16} className="opacity-60" aria-hidden="true" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
