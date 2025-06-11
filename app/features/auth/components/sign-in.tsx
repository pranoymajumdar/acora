import { zodResolver } from "@hookform/resolvers/zod";
import { LucideAtSign, LucideLock } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

import { SignInFormSchema, type SignInFormSchemaType } from "~/features/auth/schemas/sign-in";
import { Button } from "~/shared/components/ui/button";
import { Form } from "~/shared/components/ui/form";
import { clearToasts } from "~/shared/utils/clear-toasts";

import { signIn } from "../lib/auth";
import { IconInputField } from "./icon-input-field";

export function SignInForm() {
  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isPending, startTransition] = useTransition();
  const onSubmit = (values: SignInFormSchemaType): void => {
    startTransition(async () => {
      signIn.email(
        {
          email: values.email,
          password: values.password,
          callbackURL: callbackUrl,
        },
        {
          onRequest: () => {
            toast.loading("Processing...");
          },
          onSuccess: () => {
            clearToasts();
            toast.success("Sign in successful!");
            form.reset();
          },
          onError: (ctx) => {
            clearToasts();
            toast.error(ctx.error.message);
          },
        },
      );
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
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
        </div>

        <Button loading={isPending} className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
