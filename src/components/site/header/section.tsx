import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};
export default function HeaderSection({ children, className }: Props) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {children}
    </div>
  );
}
