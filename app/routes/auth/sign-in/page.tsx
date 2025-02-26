import { LucideEye, LucideEyeOff, LucideMail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import AuthSeparator from "~/components/auth/auth-separator";
import GoogleAuthButton from "~/components/auth/google-auth-button";
import AuthInput from "~/components/auth/input";
import { Button, buttonVariants } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
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

        <div className="space-y-4">
          <div className="space-y-2">
            <AuthInput
              label="Email"
              placeholder="you@example.com"
              type="email"
              icon={LucideMail}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "p-0 h-auto mx-1 font-normal text-sm"
                )}
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent"
                onClick={() => setShowPassword((prevState) => !prevState)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <LucideEyeOff size={16} />
                ) : (
                  <LucideEye size={16} />
                )}
              </Button>
            </div>
          </div>
        </div>

        <Button className="w-full" size="lg">
          Sign in
        </Button>
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
              buttonVariants({ variant: "link" }),
              "p-0 h-auto mx-1 font-normal text-sm"
            )}
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
