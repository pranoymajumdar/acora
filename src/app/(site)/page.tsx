import Container from "@/components/ui/container";
import HeroSection from "./_components/sections/hero";
import ProductCarousel from "./_components/sections/product-section";
import { getProducts } from "./getProducts";


export default async function Home() {
  const newlyLaunched = await getProducts({ limit: 4, skip: 0 });
  const bestSellers = await getProducts({ limit: 4, skip: 4 });
  const trendingProducts = await getProducts({ limit: 4, skip: 8 });
  return (
    <Container as="main" className="flex flex-col gap-16">
      <HeroSection />
      <ProductCarousel
        products={newlyLaunched}
        name="Newly Launched"
        description="Each launch comes with a special price"
        href="#"
      />
      <ProductCarousel
        products={bestSellers}
        name="Best Sellers"
        description="These products are the best sellers"
        href="#"
      />
      <ProductCarousel
        products={trendingProducts}
        name="Trending Products"
        description="These products are trending"
        href="#"
      />
    </Container>
  );
}
