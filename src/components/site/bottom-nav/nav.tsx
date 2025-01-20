"use client";

import { navLinks } from "@/constants/nav-links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathName = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 border-t px-4 py-3 flex items-center justify-around sm:hidden">
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
            <Icon className="w-6 h-6" />
            <span className="text-sm">{title}</span>
          </Link>
        ))}
    </div>
  );
}
