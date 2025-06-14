import { LucideShoppingCart } from "lucide-react";
import { Link } from "react-router";

import { Button, buttonVariants } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type ProductCardProps = {
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  slug: string;
};

export function ProductCard({
  title,
  price,
  imageUrl,
  description,
  slug,
}: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto flex flex-col">
      <div className="aspect-[4/5] overflow-hidden rounded-t-md">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="flex-1 space-y-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <div className="font-medium">
          ₹
          {price.toFixed(2)}
        </div>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <Link
          to={`/product/${slug}`}
          className={buttonVariants({
            size: "sm",
          })}
        >
          View Details
        </Link>
        <Button size="icon" variant="outline"><LucideShoppingCart /></Button>
      </CardFooter>
    </Card>
  );
}
