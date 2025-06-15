import { Header } from "@/components/Header";
import { ReactNode } from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
