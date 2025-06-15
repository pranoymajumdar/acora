"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LucideAtSign, LucideEye, LucideEyeOff, LucideLock } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SignInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z0-9]/i, { message: "Password must be alphanumeric" }),
});

type SignInFormSchemaType = z.infer<typeof SignInFormSchema>;

const SignInPage = () => {
  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = (values: SignInFormSchemaType): void => {
    startTransition(async () => {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            toast.success("Sign in successful!");
            form.reset();
            router.push(callbackUrl);
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    });
  };

  return (
    <div className="flex items-center justify-center min-w-full my-20">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id={field.name}
                            placeholder="johndoe@example.com"
                            disabled={isPending}
                            className="peer ps-9"
                            type="email"
                            {...field}
                          />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <LucideAtSign size={16} />
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor={field.name}>Password</FormLabel>
                        <Link
                          className="text-sm hover:underline"
                          href="/forgot-password"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id={field.name}
                            placeholder="••••••••••••"
                            disabled={isPending}
                            className="peer ps-9"
                            type={isVisible ? "text" : "password"}
                            {...field}
                          />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <LucideLock size={16} />
                          </div>

                          <Button
                            type="button"
                            onClick={() => setIsVisible((prevState) => !prevState)}
                            variant="ghost"
                            size="sm"
                            disabled={isPending}
                            className="absolute inset-y-0 end-0 flex items-center justify-center pe-3"
                          >
                            {isVisible ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button loading={isPending} className="w-full">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center text-muted-foreground gap-2">
          <p>{"Don't have an account ?"}</p>
          <Link
            className="text-sm font-medium hover:underline text-foreground"
            href={`/sign-up?callbackUrl=${callbackUrl}`}
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
