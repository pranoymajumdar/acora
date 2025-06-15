"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideAtSign, LucideEye, LucideEyeOff, LucideLock, LucideUser } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignUpFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[a-z0-9]/i, { message: "Password must be alphanumeric" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;

const SignUpPage = () => {
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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = (values: SignUpFormSchemaType): void => {
    startTransition(async () => {
      await authClient.signUp.email(
        {
          email: values.email,
          password: values.password,
          name: values.name,
        },
        {
          onSuccess: () => {
            toast.success("Sign up successful!");
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
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id={field.name}
                            placeholder="John Doe"
                            disabled={isPending}
                            className="peer ps-9"
                            type="text"
                            {...field}
                          />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <LucideUser size={16} />
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
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
                      <FormLabel htmlFor={field.name}>Password</FormLabel>
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Confirm Password</FormLabel>
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
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center text-muted-foreground gap-2">
          <p>{"Already have an account ?"}</p>
          <Link
            className="text-sm font-medium hover:underline text-foreground"
            href={`/sign-in?callbackUrl=${callbackUrl}`}
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
