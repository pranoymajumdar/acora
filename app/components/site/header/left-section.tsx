import { LucideHeart, LucideShoppingBag } from "lucide-react";
import { Button } from "~/components/ui/button";
import SearchBar from "./search-bar";
import { Badge } from "~/components/ui/badge";
import UserDropdown from "./user-dropdown";

export default function LeftSection() {
  const count = 12;
  return (
    <div className="flex items-center justify-end gap-6 w-full">
      <SearchBar />
      <div className="hidden md:flex items-center gap-5">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Cart"
        >
          <LucideShoppingBag size={16} aria-hidden="true" />
          {count > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1"
            >
              {count > 99 ? "99+" : count}
            </Badge>
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Wishlist"
        >
          <LucideHeart size={16} aria-hidden="true" />
          {count > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1"
            >
              {count > 99 ? "99+" : count}
            </Badge>
          )}
        </Button>
        <UserDropdown />
      </div>
    </div>
  );
}
