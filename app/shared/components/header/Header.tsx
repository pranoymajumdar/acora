import { LucideShoppingCart } from "lucide-react";
import { Link } from "react-router";

import type { SessionDataType } from "~/shared/types/getSession";

import { AcoraLogo } from "~/shared/components/Logo";
import { Button } from "~/shared/components/ui/button";

import { DesktopNavigation } from "./DesktopNavigation";
import { UserMenuDropdown } from "./UserMenuDropdown";

type HeaderProps = { sessionData: SessionDataType };

export function Header({ sessionData }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl">
          <AcoraLogo size={10} />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNavigation />

        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <Button variant="ghost" size="icon">
            <LucideShoppingCart className="h-5 w-5" />
          </Button>
          <UserMenuDropdown sessionData={sessionData} />
        </div>
      </div>
    </header>
  );
}
