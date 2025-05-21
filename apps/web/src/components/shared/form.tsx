import {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext,
} from "@/hooks/form-context";
import { Button } from "../ui/button";
import { createFormHook, useStore } from "@tanstack/react-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const FormErrorField = ({
  errors,
}: { errors: undefined[] | string[] }) =>
  errors.map(
    (error?: string) =>
      error && (
        <p key={error} className="text-destructive text-sm">
          {error}
        </p>
      ),
  );
export const TextField = ({ label }: { label: string }) => {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div className="space-y-3">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {errors.map((error: string) => (
        <p key={error} className="text-destructive text-sm">
          {error}
        </p>
      ))}
    </div>
  );
};

export const SubscribeButton = ({ label }: { label: string }) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} variant="outline">
          {isSubmitting ? "Processing..." : label}
        </Button>
      )}
    </form.Subscribe>
  );
};

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
