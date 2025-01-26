import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LucideStar, LucideStarHalf, ShoppingCart } from "lucide-react";
import type { ProductType } from "@/types/product";
import type { ReviewType } from "@/types/reviews";

const Rating = ({ rating, reviews }: { rating: number, reviews: ReviewType[] }) => {
  return (
    <div className="flex items-center gap-1.5">
      <LucideStar className="h-3.5 w-3.5 fill-primary text-primary" />
      <LucideStar className="h-3.5 w-3.5 fill-primary text-primary" />
      <LucideStar className="h-3.5 w-3.5 fill-primary text-primary" />
      <LucideStar className="h-3.5 w-3.5 fill-primary text-primary" />
      <LucideStarHalf className="h-3.5 w-3.5 fill-primary text-primary" />
      <span className="ml-1 text-xs text-muted-foreground sm:text-sm">
        {rating} {`(${reviews.length} reviews)`}
      </span>
    </div>
  );
};

export default function ProductCard({
  title,
  description,
  price,
  thumbnail,
  rating,
  reviews,
  availabilityStatus,
}: ProductType) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-colors hover:border-primary/50">
      <CardHeader className="p-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2.5 p-4">
        <Rating rating={rating} reviews={reviews} />

        <div className="space-y-1">
          <h3 className="font-medium leading-none tracking-tight">{title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm text-muted-foreground line-through">
              ${(price * 1.2).toFixed(2)}
            </span>
            <span className="text-lg font-semibold">${price}</span>
          </div>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {availabilityStatus}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2" size="sm">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
