import type { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return <>Header {children}</>;
};
