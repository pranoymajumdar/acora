"use client";
import { buttonVariants } from "@/components/ui/button";
import { navLinks } from "@/constants/nav-links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavigation() {
  const pathName = usePathname();
  return (
    <nav className="hidden sm:flex items-center justify-center space-x-3">
      {navLinks &&
        navLinks.map((link) => (
          <Link
            href={link.href}
            className={cn(
              buttonVariants({
                variant: pathName === link.href ? "secondary" : "ghost",
                size: "sm",
              })
            )}
            key={link.href}
          >
            {link.title}
          </Link>
        ))}
    </nav>
  );
}
