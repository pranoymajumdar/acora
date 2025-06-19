import { type ReactNode } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (data?.session) {
    return redirect("/_not-found");
  }
  return children;
};

export default AuthLayout;
