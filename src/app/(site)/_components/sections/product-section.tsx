import ProductCard from "@/components/site/product-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductType } from "@/types/product";
import Link from "next/link";

type Props = {
  name: string;
  description: string;
  href: string;
  products: ProductType[];
};
export default function ProductSection({ name, description, href, products }: Props) {
  return (
    <section className="flex flex-col gap-5 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-xl sm:text-3xl">{name}</h2>
          <span className="text-sm text-muted-foreground">{description}</span>
        </div>
        <Link
          href={href}
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "sm",
              effect: "shine",
            })
          )}
        >
          View more
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))
        }
      </div>
    </section>
  );
}
