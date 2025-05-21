import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/utils/trpc";
import { UpdateCategorySchema } from "@acora/zod-schemas";
import type { Category } from "@server/prisma/generated/client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import { toast } from "sonner";

export const UpdateCategoryDialog = ({
  children,
  category,
}: {
  children: ReactNode;
  category: Category;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const editCategory = useMutation(
    trpc.category.update.mutationOptions({
      onSuccess: () => {
        setOpen(false);
        router.invalidate();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );
  const form = useForm({
    defaultValues: {
      id: category.id,
      name: category.name,
      slug: category.slug,
    },
    validators: {
      onChange: UpdateCategorySchema,
    },
    onSubmit: async ({ value }) => {
      await editCategory.mutateAsync(value);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl">
            Update Category
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in the details below to update the category.
          </DialogDescription>
        </DialogHeader>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="grid gap-6 py-4"
        >
          <form.Field name="name">
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor={field.name} className="font-medium">
                  Category Name
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Premium Widget Pro"
                  className="w-full"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
          <form.Field name="slug">
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor={field.name} className="font-medium">
                  Category Slug
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="premium-widget-pro"
                  className="w-full"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <p className="text-muted-foreground text-sm">
                  This will be used for the category URL
                </p>
              </div>
            )}
          </form.Field>
          <form.Subscribe>
            {(state) => (
              <Button
                type="submit"
                className="ml-auto w-full md:w-fit"
                disabled={!state.canSubmit || state.isSubmitting}
              >
                {state.isSubmitting ? "Updating..." : "Update"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
};
