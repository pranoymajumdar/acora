import { LucideCircleUserRound, LucideShoppingCart } from "lucide-react";
import Link from "next/link";
import { AcoraLogo } from "../Logo";
import { DesktopNavigation } from "./DesktopNavigation";
import { Button } from "../ui/button";
import { UserMenuDropdown } from "../UserMenuDropdown";
import { LoginButton } from "./LoginButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const Header = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <AcoraLogo size={10} />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNavigation />

        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <Button variant="ghost" size="icon">
            <LucideShoppingCart className="h-5 w-5" />
          </Button>

          {data?.user ? (
            <UserMenuDropdown user={data?.user}>
              <Button size="icon" variant="ghost" aria-label="Open account menu">
                <LucideCircleUserRound size={16} aria-hidden="true" />
              </Button>
            </UserMenuDropdown>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  );
};
