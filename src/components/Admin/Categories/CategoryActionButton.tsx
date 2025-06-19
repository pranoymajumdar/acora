"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCategoryAction } from "@/server/category/deleteCategory";
import type { Category } from "@prisma/client";
import { LucideMoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CategoryActionButton = ({ category }: { category: Pick<Category, "id" | "name"> }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <LucideMoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async () => {
            const id = toast.loading("Processing...");
            const result = await deleteCategoryAction(category.id);
            toast.dismiss(id);
            if (result.success) {
              router.refresh();
              toast.success(`Category ${category.name} deleted successfully.`);
              return;
            }

            toast.error(result.error);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
