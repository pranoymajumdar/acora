import type { ComponentProps } from "react";

import { cn } from "~/lib/utils";

import { Header } from "../header";

export function MainLayout({ children, className }: ComponentProps<"main">) {
  return (
    <>
      <Header />
      <main className={cn("max-w-screen-2xl mx-auto px-4", className)}>{children}</main>
    </>
  );
}
