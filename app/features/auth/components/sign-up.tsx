import { IconInputField } from "./icon-input-field";
import {
  SignUpFormSchema,
  type SignUpFormSchemaType,
} from "~/features/auth/schemas/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideAtSign, LucideLock, LucideUser } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { clearToasts } from "~/utils/clear-toasts";
import { Button } from "~/shared/components/ui/button";
import { signUp } from "../lib/auth";
import { Form } from "~/shared/components/ui/form";

export const SignUpForm = () => {
  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: SignUpFormSchemaType) => {
    startTransition(async () => {
      await signUp.email(
        {
          email: values.email,
          password: values.password,
          name: values.name,
          callbackURL: "/",
        },
        {
          onRequest: () => {
            toast.loading("Processing...");
          },
          onSuccess: () => {
            clearToasts();
            toast.success("Sign up successful!");
            form.reset();
          },
          onError: (ctx) => {
            clearToasts();
            toast.error(ctx.error.message);
          },
        }
      );
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          <IconInputField
            control={form.control}
            name="name"
            label="Name"
            placeholder="John Doe"
            disabled={isPending}
            icon={LucideUser}
          />
          <IconInputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@example.com"
            disabled={isPending}
            icon={LucideAtSign}
          />
          <IconInputField
            control={form.control}
            name="password"
            label="Password"
            placeholder="••••••••••••"
            icon={LucideLock}
            disabled={isPending}
            type="password"
          />
          <IconInputField
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••••••"
            disabled={isPending}
            icon={LucideLock}
            type="password"
          />
        </div>

        <Button loading={isPending} className="w-full">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
