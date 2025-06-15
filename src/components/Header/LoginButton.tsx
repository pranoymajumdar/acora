"use client";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";

export const LoginButton = () => {
  const pathName = usePathname();
  return (
    <Link
      className={buttonVariants({
        size: "sm",
      })}
      href={`/sign-in?callbackUrl=${pathName}`}
    >
      Login
    </Link>
  );
};
