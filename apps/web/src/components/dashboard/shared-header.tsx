import type { ReactNode } from "react";

export const SharedHeader = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) => {
  return (
    <section className="flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
};
