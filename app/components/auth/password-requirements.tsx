import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { LucideInfo } from "lucide-react";
export default function PasswordRequirements() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="p-0 h-auto font-normal text-xs">
            <LucideInfo size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Your password must have:</h4>
          <ul className="text-xs space-y-1 list-disc pl-4">
            <li>At least 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one number</li>
            <li>At least one special character</li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
