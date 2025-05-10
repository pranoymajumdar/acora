import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { getSession } from "@/lib/auth/getCurrentUser";
import type { ReactNode } from "react";

const PublicLayout = async ({
  children,
  authModals,
}: Readonly<{ children: ReactNode; authModals: ReactNode }>) => {
  const session = await getSession();
  return (
    <>
      {authModals}
      <Header user={session?.user ?? null} />
      {children}
      <Toaster />
    </>
  );
};
export default PublicLayout;
