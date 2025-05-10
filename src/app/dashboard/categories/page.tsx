import { Button } from "@/components/ui/button";

import { LucidePlus } from "lucide-react";
import { CategoriesTable } from "./table";
import { db } from "@/lib/db";

const CategoriesPage = async () => {
  const categories = await db.query.categories.findMany({});
  return (
    <main className="container mx-auto px-4 my-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage categories and sub categories.
          </p>
        </div>
        <Button>
          <LucidePlus />
          Add Category
        </Button>
      </div>
      <CategoriesTable categories={categories} />
    </main>
  );
};

export default CategoriesPage;
