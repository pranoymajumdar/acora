import Container from "@/components/ui/container";
import HeroSection from "./_components/sections/hero";
import ProductCarousel from "./_components/sections/product-carousel";

export default async function Home() {
  return (
    <Container as="main" className="flex flex-col gap-16">
      <HeroSection />
      <ProductCarousel
        name="Newly Launched"
        description="Each launch comes with a special price"
        href="#"
      />
      <ProductCarousel
        name="Most Selling"
        description="Each launch comes with a special price"
        href="#"
      />
    </Container>
  );
}
