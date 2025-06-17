import Image from "next/image";

const CategoryPage = async () => {
  const products = Array.from({ length: 20 }, () => ({
    name: "Fantastic Metal Computer",
    slug: "",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=404&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }));

  return (
    <main className="container mx-auto space-y-6 px-4 py-6 sm:py-8 md:py-10">
      <section className="flex items-center justify-between">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">Clothes Products</h1>
      </section>

      <section className="xs:grid-cols-2 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5 xl:grid-cols-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="group mx-auto flex w-full max-w-[200px] cursor-pointer flex-col"
          >
            {/* Image Container */}
            <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-muted sm:mb-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={index < 4}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-1 px-1">
              <h3 className="line-clamp-2 text-sm leading-tight font-medium text-foreground sm:text-base">
                {product.name}
              </h3>
              <p className="text-sm font-medium text-primary sm:text-base">${product.price}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default CategoryPage;
