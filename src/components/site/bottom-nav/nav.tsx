"use client";

import { navLinks } from "@/constants/nav-links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathName = usePathname();
  return (
    <div className="sticky bottom-0 left-0 right-0 h-14 border-t px-4 py-3 flex items-center justify-around sm:hidden bg-background/95 backdrop-blur">
      {navLinks &&
        navLinks.map(({ href, icon: Icon, title }) => (
          <Link
            href={href}
            key={href}
            className={cn(
              "flex flex-col items-center justify-center hover:text-foreground",
              pathName === href ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{title}</span>
          </Link>
        ))}
    </div>
  );
}
