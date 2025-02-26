import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  LucideBolt,
  LucideBookOpen,
  LucideChevronDown,
  LucideLayers2,
  LucideLogOut,
  LucidePin,
  LucideUserPen,
} from "lucide-react";

export default function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">Keith Kennedy</span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            k.kennedy@originui.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LucideBolt size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LucideLayers2 size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LucideBookOpen size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LucidePin size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LucideUserPen size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LucideLogOut size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
