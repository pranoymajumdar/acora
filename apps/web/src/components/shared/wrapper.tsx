import { cn } from "@/lib/utils";
import type { ComponentProps, ElementType, ReactNode } from "react";

type WrapperProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & ComponentProps<T>;

export const Wrapper = <T extends ElementType = "main">({
  children,
  className,
  as: Component = "main",
  ...props
}: WrapperProps<T>) => {
  return (
    <Component
      className={cn("container mx-auto my-6 space-y-6 px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
};
