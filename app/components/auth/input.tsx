import { type LucideIcon } from "lucide-react";
import { Input } from "../ui/input";
import { forwardRef, type ComponentProps } from "react";

interface AuthInputProps extends ComponentProps<typeof Input> {
  icon: LucideIcon;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative">
        <Input className="peer ps-9" {...props} />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <Icon size={16} aria-hidden="true" />
        </div>
      </div>
    );
  }
);

export default AuthInput;
