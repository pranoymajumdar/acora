import type { ReactNode } from "react";

export const PageHeader = ({
  children,
  name,
  description,
}: {
  children: ReactNode;
  name: string;
  description: string;
}) => {
  return (
    <section className="flex items-center justify-between gap-2">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold md:text-2xl md:font-bold">{name}</h1>
        <p className="text-xs text-balance text-muted-foreground md:text-sm">{description}</p>
      </div>
      {children}
    </section>
  );
};
