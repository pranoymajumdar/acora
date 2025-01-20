import Container from "@/components/ui/container";

import { Button } from "@/components/ui/button";
import { LucideHeart, LucideShoppingCart } from "lucide-react";
import HeaderLogo from "./logo";
import HeaderNavigation from "./nav";
import HeaderSection from "./section";

export default function Header() {
  return (
    <header className="sticky z-50 h-14 supports-[backdrop-filter]:bg-background/60 backdrop-blur top-0 border-b">
      <Container className="h-full flex items-center justify-between px-4">
        <HeaderSection className="space-x-6">
          <HeaderLogo />
          <HeaderNavigation />
        </HeaderSection>
        <HeaderSection className="space-x-4">
          <Button variant="outline" size="icon">
            <LucideShoppingCart />
          </Button>
          <Button variant="outline" size="icon">
            <LucideHeart />
          </Button>
          <Button>Login</Button>
        </HeaderSection>
      </Container>
    </header>
  );
}
