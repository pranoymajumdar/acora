import {
  LucideEye,
  LucideEyeOff,
  LucideMail,
  LucidePhone,
  LucideUser,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import AuthSeparator from "~/components/auth/auth-separator";
import GoogleAuthButton from "~/components/auth/google-auth-button";
import AuthInput from "~/components/auth/input";
import PasswordRequirements from "~/components/auth/password-requirements";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

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
        <AuthSeparator/>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <AuthInput
              label="Full Name"
              placeholder="Enter your full name" 
              type="text"
              icon={LucideUser}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <AuthInput
              label="Email"
              placeholder="you@example.com"
              type="email"
              icon={LucideMail}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <PasswordRequirements />
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

          {/* Phone Number */}
          <div className="space-y-2">
            <AuthInput
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              type="tel"
              icon={LucidePhone}
            />
          </div>
        </div>

        {/* Sign Up Button */}  
        <Button className="w-full" size="lg">
          Create Account
        </Button>

        {/* Terms & Conditions */}
        <p className="text-xs text-muted-foreground text-center">
          By creating an account, you agree to our
          <Button
            variant="link"
            className="p-0 h-auto mx-1 font-normal text-xs"
          >
            Terms of Service
          </Button>
          and
          <Button
            variant="link"
            className="p-0 h-auto mx-1 font-normal text-xs"
          >
            Privacy Policy
          </Button>
        </p>

        {/* Sign In Link */}
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Already have an account?
          </span>
          <Link
            to="/sign-in"
            className={cn(
              buttonVariants({
                variant: "link",
                className: "p-0 h-auto ml-1 font-normal text-sm",
              })
            )}
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
