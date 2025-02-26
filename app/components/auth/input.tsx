import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type LucideIcon } from "lucide-react";
import { useId, type HTMLInputTypeAttribute } from "react";

type Props = {
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  icon?: LucideIcon;
};

export default function AuthInput({
  label,
  placeholder,
  type,
  icon: Icon,
}: Props) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          className="peer ps-9"
          placeholder={placeholder}
          type={type}
        />
        {Icon && (
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <Icon size={16} aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}
