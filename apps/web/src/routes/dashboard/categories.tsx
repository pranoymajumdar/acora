import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SharedHeader } from "@/components/dashboard/shared-header";
import { Button } from "@/components/ui/button";
import { LucideLayers } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import {
  CategoryTableMoreAction,
  CreateCategoryDialog,
} from "@/components/dashboard/categories";

export const Route = createFileRoute("/dashboard/categories")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: categories } = useQuery(trpc.category.getAll.queryOptions());
  console.log(categories);
  return (
    <main className="container mx-auto my-6 space-y-6 px-8">
      <SharedHeader
        title="Categories"
        description="Manage categories to organise your products."
      >
        <CreateCategoryDialog>
          <Button variant="outline">
            <LucideLayers />
            Create
          </Button>
        </CreateCategoryDialog>
      </SharedHeader>
      <div className="overflow-hidden rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-9 py-2">Name</TableHead>
              <TableHead className="h-9 py-2">Slug</TableHead>
              <TableHead className="h-9 py-2">Products</TableHead>
              <TableHead className="h-9 py-2">Created At</TableHead>
              <TableHead className="h-9 py-2">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories && categories.length > 0 ? (
              categories?.map((category) => (
                <TableRow key={category.name}>
                  <TableCell className="py-2 font-medium">
                    {category.slug}
                  </TableCell>
                  <TableCell className="py-2">{category.slug}</TableCell>
                  <TableCell className="py-2">
                    {category.products.length}
                  </TableCell>
                  <TableCell className="py-2">
                    {new Date(category.createdAt).toDateString()}
                  </TableCell>
                  <TableCell className="py-2">
                    <CategoryTableMoreAction categoryId={category.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No Result
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
