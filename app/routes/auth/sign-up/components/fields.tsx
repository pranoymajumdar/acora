import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { formSchema } from "../form-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import AuthInput from "~/components/auth/input";
import { LucideAtSign, LucideUser } from "lucide-react";
import PasswordRequirements from "~/components/auth/password-requirements";
import PasswordInput from "~/components/auth/password-input";
import { Button } from "~/components/ui/button";

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

export const SignUpFields = ({ form, onSubmit }: Props) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <AuthInput icon={LucideUser} placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
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
              <AuthInput
                icon={LucideAtSign}
                placeholder="example@gmail.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Password</FormLabel>
              <PasswordRequirements />
            </div>
            <FormControl>
              <PasswordInput {...field} />
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
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <PasswordInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button className="w-full" size="lg" type="submit">
        Create Account
      </Button>
    </form>
  );
};
