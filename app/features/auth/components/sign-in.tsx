import {
  SignInFormSchema,
  type SignInFormSchemaType,
} from "~/features/auth/schemas/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideAtSign, LucideLock } from "lucide-react";
import { useForm } from "react-hook-form";
import { IconInputField } from "./icon-input-field";
import { Form } from "~/shared/components/ui/form";
import { Button } from "~/shared/components/ui/button";
import { useTransition } from "react";
import { signIn } from "../lib/auth";
import { toast } from "sonner";
import { clearToasts } from "~/utils/clear-toasts";
import { useSearchParams } from "react-router";

export const SignInForm = () => {
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
  const onSubmit = (values: SignInFormSchemaType) => {
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
};
