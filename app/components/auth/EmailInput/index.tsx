import { LucideAtSign } from 'lucide-react';
import type { ChangeEventHandler } from 'react';
import { Input } from '~/components/ui/input';

export default function EmailInput({
  id,
  placeholder = 'm@example.com',
  onChange
}: {
  id: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="relative">
      <Input
        id={id}
        className="peer ps-9"
        placeholder={placeholder}
        type="email"
        onChange={onChange}
        required
        autoComplete="off"
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <LucideAtSign size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
}
