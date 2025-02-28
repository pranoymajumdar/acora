import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthSeparator } from "~/components/auth/auth-separator";
import { GoogleAuthButton } from "~/components/auth/google-auth-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { SignUpFields } from "./components/fields";
import { SignUpFooter } from "./components/sign-up-footer";
import { formSchema } from "./form-schema";
import { signUp } from "~/lib/auth-client";

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.fullName,
        callbackURL: '/'
      },
      {
        onRequest: (ctx) => {
          console.log("Loading");
        },
        onSuccess: (ctx) => {
          console.log("Successfull");
        },
        onError: (ctx) => {
          // display the error message
          console.log(ctx.error)
          alert(ctx.error.message);
        },
      }
    );
  }
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-center">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Sign up to start shopping and track your orders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <GoogleAuthButton />
        <AuthSeparator />
        <Form {...form}>
          <SignUpFields form={form} onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <SignUpFooter />
    </Card>
  );
}
