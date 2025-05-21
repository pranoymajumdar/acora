import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/utils/trpc";
import type { Product } from "@server/prisma/generated/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { LucideDelete, LucideMoreVertical } from "lucide-react";
export const ProductsTableMoreAction = ({ product }: { product: Product }) => {
  const deleteProduct = useMutation(trpc.products.delete.mutationOptions());
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <LucideMoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={async () => {
            await deleteProduct.mutateAsync({ id: product.id });
            router.invalidate();
          }}
        >
          <LucideDelete />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
