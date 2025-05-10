import Link from "next/link";
import { AcoraLogo } from "./logo";
import { HeaderNavigation } from "./nav";
import { Button, buttonVariants } from "./ui/button";
import { LucideSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionUserType } from "@/lib/auth/core/session";
import { NavUser } from "./nav-user";

export const Header = ({ user }: { user: SessionUserType | null }) => {
  return (
    <header className="z-50 sticky top-0 border-b bg-background/90 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/">
              <AcoraLogo size={12} showText={false} />
            </Link>
            <HeaderNavigation />
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <LucideSearch />
            </Button>
            {user ? (
              <NavUser user={user} />
            ) : (
              <Link
                href="/sign-in"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
