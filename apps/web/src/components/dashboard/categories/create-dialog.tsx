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
import { CategorySchema } from "@acora/zod-schemas";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";

export const CreateCategoryDialog = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const createCategory = useMutation(
    trpc.category.create.mutationOptions({
      onSuccess: () => {
        setOpen(false);
        router.invalidate();
      },
    }),
  );
  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
    validators: {
      onChange: CategorySchema,
    },
    onSubmit: async ({ value }) => {
      await createCategory.mutateAsync(value);
    },
    listeners: {
      onChange: ({ fieldApi }) => {
        if (fieldApi.name === "name") {
          generateSlug();
        }
      },
    },
  });
  const generateSlug = () => {
    if (form.state.values.name !== "") {
      form.setFieldValue(
        "slug",
        form.state.values.name
          .toLowerCase()
          .replaceAll(" ", "-")
          .replaceAll("&", "-")
          .replaceAll("_", "-")
          .replaceAll("%", "-"),
      );
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl">
            Create New Category
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in the details below to add a new category.
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
                  placeholder="Enter category name"
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
                <div className="flex items-center justify-between">
                  <Label htmlFor={field.name} className="font-medium">
                    Category Slug
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={generateSlug}
                  >
                    Generate
                  </Button>
                </div>
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
                  This will be used for the product URL
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
                {state.isSubmitting ? "Creating..." : "Create"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
};
