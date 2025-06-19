import { PageHeader } from "@/components/Admin/PageHeader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { CategoryActionButton, CreateCategoryDialog } from "@/components/Admin/Categories";

const AdminCategories = async () => {
  const categories = await db.category.findMany({
    include: {
      parent: true,
    },
  });
  return (
    <div className="container mx-auto space-y-6 px-4 py-6">
      <PageHeader name="Categories" description="Manage and organize product categories">
        <CreateCategoryDialog categories={categories} />
      </PageHeader>

      <Table>
        <TableCaption>A list of your categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead>More Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell>{category.parent ? category.parent.name : "No parent"}</TableCell>
              <TableCell>
                <CategoryActionButton
                  category={{
                    id: category.id,
                    name: category.name,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCategories;
