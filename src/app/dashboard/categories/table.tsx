"use client";

import type { CategoriesSelect } from "@/drizzle/schemas/categories";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import {
  LucideCopy,
  LucideDelete,
  LucideLink2,
  LucideLock,
  LucideMoreHorizontal,
  LucidePencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const columnsHelper = createColumnHelper<CategoriesSelect>();
const columns: ColumnDef<CategoriesSelect, string & Date>[] = [
  columnsHelper.accessor("id", {
    header: () => "id",
    cell: (info) => info.getValue(),
  }),
  columnsHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
  columnsHelper.accessor("slug", {
    header: () => "Slug",
    cell: (info) => info.getValue(),
  }),
  columnsHelper.accessor("createdAt", {
    header: () => "Created at",
    cell: (info) => info.getValue()?.toDateString(),
  }),
  columnsHelper.display({
    id: "more",
    header: () => "More",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <LucideMoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <LucidePencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LucideLink2 />
              Sub categories
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LucideCopy />
              Duplicate
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <LucideLock />
              Disable
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <LucideDelete />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
];

export const CategoriesTable = ({
  categories,
}: {
  categories: CategoriesSelect[];
}) => <DataTable columns={columns} data={categories} />;
