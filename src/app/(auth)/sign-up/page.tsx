'use client';

import { IconInputField } from "@/components/IconInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { clearToasts } from "@/utils/clearToasts";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideAtSign, LucideLock, LucideUser } from "lucide-react";
import { useTransition } from "react";
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
    .refine(data => data.password === data.confirmPassword, {
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

    const onSubmit = (values: SignUpFormSchemaType): void => {
        startTransition(async () => {
            await authClient.signUp.email(
                {
                    email: values.email,
                    password: values.password,
                    name: values.name,
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
}

export default SignUpPage