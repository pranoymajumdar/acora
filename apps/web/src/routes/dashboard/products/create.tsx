import { ProductFormCategoryCard } from "@/components/dashboard/products/form-card";
import { SharedHeader } from "@/components/dashboard/shared-header";
import { FileDropzone } from "@/components/shared/file-dropzone";
import { FormErrorField } from "@/components/shared/form";
import { Wrapper } from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { generateSKU } from "@/utils/generate-sku";
import { generateSlug } from "@/utils/generate-slug";
import { trpc } from "@/utils/trpc";
import { UploadDropzone } from "@/utils/uploadthing";
import { ProductSchema } from "@acora/zod-schemas";
import { formOptions, useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LucideDollarSign, LucidePackage } from "lucide-react";
import { toast } from "sonner";

const productFormOptions = formOptions({
  defaultValues: {
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    price: 0,
    stock: 0,
    sku: "",
    categoryId: "",
    isActive: true,
    isFeatured: false,
    imagesUrl: [""],
    discountPrice: 0,
  },
});

export const Route = createFileRoute("/dashboard/products/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { data: categories } = useQuery(trpc.category.getAll.queryOptions());
  const createProduct = useMutation(trpc.products.create.mutationOptions());

  const form = useForm({
    ...productFormOptions,
    onSubmit: async ({ value }) => {
      await createProduct.mutateAsync(value);
      navigate({
        to: "/dashboard/products",
      });
    },
    validators: {
      onSubmit: ({ value }) => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>;
        };

        const res = ProductSchema.safeParse(value);
        if (res.error) {
          for (const error of res.error.errors) {
            if (typeof error.path[0] !== "undefined") {
              errors.fields[error.path[0]] = error.message;
            }
          }
        }

        return errors;
      },
    },
    listeners: {
      onChange: ({ fieldApi }) => {
        if (fieldApi.name === "name" && fieldApi.state.value !== "") {
          fieldApi.form.setFieldValue(
            "slug",
            generateSlug(fieldApi.form.getFieldValue("name")),
          );
          fieldApi.form.setFieldValue(
            "sku",
            generateSKU(fieldApi.form.getFieldValue("name")),
          );
        }
      },
    },
  });

  return (
    <Wrapper<"form">
      as="form"
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <SharedHeader
        title="Create New Product"
        description="Add a new product to your store inventory"
      >
        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isFormValid,
          ]}
          children={([canSubmit, isSubmitting, isFormValid]) => (
            <Button variant="outline" disabled={!canSubmit || !isFormValid}>
              <LucidePackage />
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          )}
        />
      </SharedHeader>

      <div className="grid grid-cols-1 gap-6 space-y-4 md:grid-cols-2">
        <ProductFormCategoryCard
          title="Basic Information"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, doloremque."
        >
          <form.Field
            name="name"
            children={(field) => (
              <div className="space-y-3">
                <Label htmlFor={field.name}>Product Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Plain T-Shirt"
                  type="text"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FormErrorField errors={field.state.meta.errors} />
              </div>
            )}
          />
          <form.Field
            name="slug"
            children={(field) => (
              <div className="space-y-3">
                <Label htmlFor={field.name}>Product Slug</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="plain-t-shirt"
                  type="text"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FormErrorField errors={field.state.meta.errors} />
              </div>
            )}
          />
          <form.Field
            name="shortDescription"
            children={(field) => (
              <div className="space-y-3">
                <Label htmlFor={field.name}>Short Description</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="plain-t-shirt"
                  type="text"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FormErrorField errors={field.state.meta.errors} />
              </div>
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <div className="space-y-3">
                <Label htmlFor={field.name}>Product Description</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Enter product description."
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FormErrorField errors={field.state.meta.errors} />
              </div>
            )}
          />
        </ProductFormCategoryCard>
        <ProductFormCategoryCard
          title="Pricing & Inventory"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, doloremque."
        >
          <form.Field
            name="price"
            children={(field) => (
              <div className="space-y-3">
                <Label htmlFor={field.name}>Regular Price</Label>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    className="peer ps-9"
                    placeholder="39.00"
                    type="number"
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                  />
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <LucideDollarSign size={16} aria-hidden="true" />
                  </div>
                </div>
                <FormErrorField errors={field.state.meta.errors} />
              </div>
            )}
          />

          <form.Field
            name="discountPrice"
            children={(field) => (
              <div className="space-y-3">
                <Label htmlFor={field.name}>Discounted Price</Label>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    className="peer ps-9"
                    value={field.state.value}
                    placeholder="29.00"
                    type="number"
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                  />
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <LucideDollarSign size={16} aria-hidden="true" />
                  </div>
                </div>
                <FormErrorField errors={field.state.meta.errors} />
              </div>
            )}
          />

          <form.Field
            name="stock"
            children={(field) => (
              <div className="space-y-3">
                <Label htmlFor={field.name}>Stock Quantity</Label>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    className="peer ps-9"
                    placeholder="29.00"
                    type="number"
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                  />
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <LucideDollarSign size={16} aria-hidden="true" />
                  </div>
                </div>
                <FormErrorField errors={field.state.meta.errors} />
              </div>
            )}
          />

          <form.Field
            name="sku"
            children={(field) => (
              <div className="space-y-3">
                <Label htmlFor={field.name}>{"SKU (Stock Keeping Unit)"}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="PLAIN-T-SHIRT"
                  type="text"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FormErrorField errors={field.state.meta.errors} />
              </div>
            )}
          />
        </ProductFormCategoryCard>
        <ProductFormCategoryCard
          title="Category & Status"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, doloremque."
        >
          <form.Field
            name="categoryId"
            children={(field) => (
              <div className="space-y-3">
                <Label htmlFor={field.name}>Select a category</Label>
                <Select onValueChange={(e) => field.handleChange(e)}>
                  <SelectTrigger id={field.name} className="w-full">
                    <SelectValue placeholder="Click to select" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormErrorField errors={field.state.meta.errors} />
              </div>
            )}
          />
          <form.Field
            name="isActive"
            children={(field) => (
              <div className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50">
                <Switch
                  id={field.name}
                  checked={field.state.value.valueOf()}
                  onCheckedChange={(e) => field.handleChange(e.valueOf())}
                  className="data-[state=checked]:[&_span]:rtl:-translate-x-2 order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2"
                  aria-describedby={`${field.name}-description`}
                />
                <div className="grid grow gap-2">
                  <Label htmlFor={field.name}>
                    Active
                    <span className="font-normal text-muted-foreground text-xs leading-[inherit]">
                      {"(Visible in store)"}
                    </span>
                  </Label>
                  <p
                    id={`${field.name}-description`}
                    className="text-muted-foreground text-xs"
                  >
                    Enable this option to make the product visible to customers
                    in your online store.
                  </p>
                </div>
              </div>
            )}
          />
          <form.Field
            name="isFeatured"
            children={(field) => (
              <div className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50">
                <Switch
                  id={field.name}
                  checked={field.state.value.valueOf()}
                  onCheckedChange={(e) => field.handleChange(e.valueOf())}
                  className="data-[state=checked]:[&_span]:rtl:-translate-x-2 order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2"
                  aria-describedby={`${field.name}-description`}
                />
                <div className="grid grow gap-2">
                  <Label htmlFor={field.name}>Featured Product</Label>
                  <p
                    id={`${field.name}-description`}
                    className="text-muted-foreground text-xs"
                  >
                    Highlight this product on the homepage or featured section
                    to boost visibility.
                  </p>
                </div>
              </div>
            )}
          />
        </ProductFormCategoryCard>
        <ProductFormCategoryCard
          title="Product Images"
          description="Upload and manage product photos. Add multiple images to showcase your product from different angles."
        >
          <form.Field
            name="imagesUrl"
            children={(field) => (
              // <UploadDropzone
              //   endpoint="image"
              //   onClientUploadComplete={(res) => {
              //     field.removeValue(0);
              //     for (const image of res) {
              //       field.pushValue(image.ufsUrl);
              //     }
              //   }}
              //   onUploadError={(error: Error) => {
              //     toast.error(error.message);
              //   }}
              //   onUploadBegin={(name) => {
              //     toast.info(`Uploading: ${name}`);
              //   }}
              // />
              <FileDropzone />
            )}
          />
        </ProductFormCategoryCard>
      </div>
    </Wrapper>
  );
}
