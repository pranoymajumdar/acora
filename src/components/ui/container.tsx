import { cn } from "@/lib/utils";
import type { ReactNode, ElementType } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export default function Container({
  children,
  className,
  as: Component = "div",
}: Props) {
  return (
    <Component className={cn('mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12', className)}>
        {children}
    </Component>
  )
}
