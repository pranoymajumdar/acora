import { ProductsTableMoreAction } from "@/components/dashboard/products/more-action";
import { SharedHeader } from "@/components/dashboard/shared-header";
import { Wrapper } from "@/components/shared/wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LucidePackagePlus } from "lucide-react";

export const Route = createFileRoute("/dashboard/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: products } = useQuery(trpc.products.getAll.queryOptions());

  return (
    <Wrapper>
      <SharedHeader
        title="Products"
        description="Control and manage all your products here."
      >
        <Link
          to="/dashboard/products/create"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          <LucidePackagePlus />
          Create
        </Link>
      </SharedHeader>
      <div className="overflow-hidden rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-9 py-2">Name</TableHead>
              <TableHead className="h-9 py-2">Slug</TableHead>
              <TableHead className="h-9 py-2">Categories</TableHead>
              <TableHead className="h-9 py-2">Created At</TableHead>
              <TableHead className="h-9 py-2">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="py-2 font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell className="py-2">{product.slug}</TableCell>
                  <TableCell className="py-2">
                    {product.category.name}
                  </TableCell>
                  <TableCell className="py-2">
                    {product.createdAt.toDateString()}
                  </TableCell>
                  <TableCell className="py-2">
                    <ProductsTableMoreAction product={product} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No Result
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Wrapper>
  );
}
