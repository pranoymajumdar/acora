import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function ProductCard() {
  return (
    <Card className="w-full">
      <Image
        src="/placeholder.svg"
        width={600}
        height={600}
        alt="Product Image"
        className="aspect-square object-cover rounded-t-lg"
      />
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold">
            Acme Prism Tee
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            A cozy and stylish tee with a unique prism-inspired design.
          </CardDescription>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-bold">$49.99</span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  );
}
