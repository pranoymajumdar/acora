import {Container} from "~/components/ui/container";
import LeftSection from "./left-section";
import NavMenu from "./nav-menu";

export default function Header() {
  return (
    <header className="sticky h-14 top-0 z-50 supports-[backdrop-filter]:bg-background/80 backdrop-blur border-b">
      <Container className="h-full flex justify-between items-center gap-4 max-w-7xl">
        <div className="flex items-center gap-5 max-w-min">
          <h2 className="text-xl font-semibold">Acora</h2>
          <NavMenu />
        </div>
        <LeftSection />
      </Container>
    </header>
  );
}
 