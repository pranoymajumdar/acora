import { LucideEyeOff, LucideEye } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { forwardRef, useState, type ComponentProps } from "react";

interface PasswordInputProps extends ComponentProps<typeof Input> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    return (
      <div className="relative">
        <Input
          ref={ref}
          {...props}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent"
          onClick={() => setShowPassword((prevState) => !prevState)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
        </Button>
      </div>
    );
  }
);

export default PasswordInput;
