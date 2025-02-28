import { useForm } from "react-hook-form";
import { Link } from "react-router";
import type { z } from "zod";
import { AuthSeparator } from "~/components/auth/auth-separator";
import { GoogleAuthButton } from "~/components/auth/google-auth-button";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { formSchema } from "./form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFields } from "./components/fields";
import { Form } from "~/components/ui/form";
import { signIn } from "~/lib/auth-client";


export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: '/'
    });
  };
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-center">
          Sign in to your account
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <GoogleAuthButton />
        <AuthSeparator />
        <Form {...form}>
          <SignInFields form={form} onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {/* Terms & Conditions */}
        <p className="text-xs text-muted-foreground text-center">
          By continuing, you acknowledge that you have read and understood our
          Terms of Service and Privacy Policy.
        </p>

        {/* Sign Up Link */}
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className={cn(
              buttonVariants({ variant: "link", className: "text-sm" })
            )}
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
