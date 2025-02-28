import { LucideAtSign } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import AuthInput from "~/components/auth/input";
import PasswordInput from "~/components/auth/password-input";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import type { formSchema } from "../form-schema";

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};
export const SignInFields = ({ form, onSubmit }: Props) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormLabel>Password</FormLabel>
            <FormControl>
              <PasswordInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button className="w-full" size="lg" type="submit">
        Sign in
      </Button>
    </form>
  );
};
