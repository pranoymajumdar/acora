import type { ElementType, ReactNode } from "react";
import { cn } from "~/lib/utils";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function Container({
  as: Component = "div",
  children,
  className,
}: Props) {
  return (
    <Component
      className={cn(
        "max-w-6xl mx-auto px-4 md:px-6 lg:px-8 xl:px-12",
        className
      )}
    >
      {children}
    </Component>
  );
}
