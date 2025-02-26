import React from 'react'
import { Separator } from '../ui/separator';

export default function AuthSeparator() {
  return (
    <div className="flex items-center gap-4 my-6">
      <Separator className="h-px flex-1" />
      <span className="text-sm text-muted-foreground uppercase">OR</span>
      <Separator className="h-px flex-1" />
    </div>
  );
}
