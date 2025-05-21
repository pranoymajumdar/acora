import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/utils/trpc";
import type { Category } from "@server/prisma/generated/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { LucideDelete, LucideEdit, LucideMoreVertical } from "lucide-react";
import { UpdateCategoryDialog } from "./update-dialog";

export const CategoryTableMoreAction = ({
  category,
}: {
  category: Category;
}) => {
  const deleteCategory = useMutation(trpc.category.delete.mutationOptions());
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <LucideMoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <UpdateCategoryDialog category={category}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <LucideEdit />
            Edit
          </DropdownMenuItem>
        </UpdateCategoryDialog>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={async () => {
            await deleteCategory.mutateAsync({ id: category.id });
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
