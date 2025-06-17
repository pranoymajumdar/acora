"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { LucideLogOut } from "lucide-react";

export const SignOutItem = () => {
  const router = useRouter();
  return (
    <DropdownMenuItem
      variant="destructive"
      onSelect={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
            },
          },
        });
      }}
    >
      <LucideLogOut />
      Logout
    </DropdownMenuItem>
  );
};
