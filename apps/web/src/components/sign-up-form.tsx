import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { LockKeyhole, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Loader } from "./shared/loader";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const SignUpForm = ({
  onSwitchToSignIn,
  redirectTo,
}: {
  onSwitchToSignIn: () => void;
  redirectTo: string;
}) => {
  const navigate = useNavigate({
    from: "/",
  });
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: () => {
            navigate({
              to: redirectTo,
            });
            toast.success("Sign up successful");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    void form.handleSubmit();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center font-bold text-2xl">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <form.Field name="name">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="font-medium text-sm">
                      Full Name
                    </Label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        <User className="h-4 w-4" />
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="John Doe"
                        className="pl-10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                    {field.state.meta.errors.map((error) => (
                      <p
                        key={error?.message}
                        className="font-medium text-destructive text-sm"
                      >
                        {error?.message}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
            </div>

            <div>
              <form.Field name="email">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="font-medium text-sm">
                      Email
                    </Label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="you@example.com"
                        className="pl-10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                    {field.state.meta.errors.map((error) => (
                      <p
                        key={error?.message}
                        className="font-medium text-destructive text-sm"
                      >
                        {error?.message}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
            </div>

            <div>
              <form.Field name="password">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="font-medium text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        <LockKeyhole className="h-4 w-4" />
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="••••••••"
                        className="pl-10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                    {field.state.meta.errors.map((error) => (
                      <p
                        key={error?.message}
                        className="font-medium text-destructive text-sm"
                      >
                        {error?.message}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
            </div>

            <form.Subscribe>
              {(state) => (
                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  size="lg"
                  disabled={!state.canSubmit || state.isSubmitting}
                >
                  {state.isSubmitting
                    ? "Creating account..."
                    : "Create Account"}
                </Button>
              )}
            </form.Subscribe>

            <p className="text-center text-muted-foreground text-xs">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 border-t pt-4">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Button
              variant="link"
              onClick={onSwitchToSignIn}
              className="h-auto p-0"
            >
              Sign in
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
