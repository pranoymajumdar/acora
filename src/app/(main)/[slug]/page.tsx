import { faker } from "@faker-js/faker";
import Image from "next/image";

const CategoryPage = async () => {
  const products = Array.from({ length: 20 }, () => ({
    name: faker.commerce.productName(),
    slug: faker.commerce.productName().toLowerCase().replaceAll(" ", "-"),
    price: faker.commerce.price(),
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=404&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }));

  return (
    <main className="container mx-auto px-4 py-6 sm:py-8 md:py-10 space-y-6">
      <section className="flex justify-between items-center">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
          {faker.commerce.productAdjective()} Products
        </h1>
      </section>

      <section className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col w-full max-w-[200px] group cursor-pointer mx-auto"
          >
            {/* Image Container */}
            <div className="relative mb-2 sm:mb-3 bg-muted rounded-lg overflow-hidden aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority={index < 4}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-1 px-1">
              <h3 className="text-sm sm:text-base font-medium text-foreground leading-tight line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm sm:text-base text-primary font-medium">${product.price}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default CategoryPage;
