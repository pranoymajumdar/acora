import { PageHeader } from "@/components/Admin/PageHeader";
import { Button } from "@/components/ui/button";
import { LucideFolderPlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminCategories = async () => {
  return (
    <div className="container mx-auto space-y-6 px-4 py-6">
      <PageHeader name="Categories" description="Manage and organize product categories">
        <Button>
          <LucideFolderPlus />
          Create
        </Button>
      </PageHeader>

      <Table>
        <TableCaption>A list of your categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Men</TableCell>
            <TableCell>men-clothes</TableCell>
            <TableCell>clothes</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCategories;
