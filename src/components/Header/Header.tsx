import { LucideShoppingCart } from "lucide-react";
import Link from "next/link";
import { AcoraLogo } from "../Logo";
import { DesktopNavigation } from "./DesktopNavigation";
import { Button } from "../ui/button";
import { SignedIn } from "../SignedIn";
import { UserMenuDropdown } from "./UserMenuDropdown";
import { SignedOut } from "../SignedOut";
import { LoginButton } from "./LoginButton";


export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-bold text-xl">
                    <AcoraLogo size={10} />
                </Link>

                {/* Desktop Navigation */}
                <DesktopNavigation />

                <div className="flex items-center gap-4">
                    {/* Cart Button */}
                    <Button variant="ghost" size="icon">
                        <LucideShoppingCart className="h-5 w-5" />
                    </Button>

                    <SignedIn>
                        <UserMenuDropdown />
                    </SignedIn>

                    <SignedOut><LoginButton /></SignedOut>

                </div>
            </div>
        </header>
    )
}
