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
      <Input
        id={id}
        placeholder={placeholder}
        type="email"
        onChange={onChange}
        required
        autoComplete="off"
      />
  );
}
