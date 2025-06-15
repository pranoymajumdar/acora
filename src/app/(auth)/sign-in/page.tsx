'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { LucideAtSign, LucideLock } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { clearToasts } from "@/utils/clearToasts";
import { IconInputField } from "@/components/IconInputField";


const SignInFormSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 68 characters long" })
        .regex(/[a-z0-9]/i, { message: "Password must be alphanumeric" }),
});

type SignInFormSchemaType = z.infer<typeof SignInFormSchema>

const SignInPage = () => {
    const form = useForm<SignInFormSchemaType>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: SignInFormSchemaType): void => {
        startTransition(async () => {
            await authClient.signIn.email(
                {
                    email: values.email,
                    password: values.password,
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

export default SignInPage