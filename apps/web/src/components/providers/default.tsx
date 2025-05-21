import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="acora-ui-theme">
      {children}
    </ThemeProvider>
  );
};
