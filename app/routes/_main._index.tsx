import { ProductCard } from "~/shared/components/products";

function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <ProductCard
        title="Modern Desk Lamp"
        price={49.99}
        imageUrl="http://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1724520859_1438769.jpg?format=webp&w=480&dpr=1.0"
        description="Minimalist LED desk lamp with adjustable brightness and color temperature"
        slug="modern-desk-lamp"
      />
    </div>
  );
}

export default HomePage;
