import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Container } from "~/components/ui/container";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import {
  CheckCircle,
  LucideAlertCircle,
  LucideCheckCircle,
  LucideEye,
  LucideEyeOff,
} from "lucide-react";

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Function to toggle password visibility
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Simulate password strength checking
  const checkPasswordStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    // Simple password strength logic
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;

    setPasswordStrength(strength);
  };

  return (
    <Container
      as="main"
      className="min-h-screen grid items-center justify-center py-8"
    >
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">
            Create new password
          </CardTitle>
          <CardDescription className="text-center">
            Your new password must be different from previously used passwords
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* New Password with toggle */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={checkPasswordStrength}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:bg-transparent"
                onClick={toggleNewPasswordVisibility}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <LucideEyeOff className="h-4 w-4" />
                ) : (
                  <LucideEye className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Password strength indicator */}
            <div className="space-y-2">
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    passwordStrength <= 25
                      ? "bg-red-500"
                      : passwordStrength <= 50
                      ? "bg-orange-500"
                      : passwordStrength <= 75
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
              <div className="flex text-xs justify-between">
                <span>Weak</span>
                <span>Strong</span>
              </div>
            </div>
          </div>

          {/* Password requirements */}
          <div className="space-y-2 text-sm">
            <p className="font-medium">Password requirements:</p>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                {passwordStrength >= 25 ? (
                  <CheckCircle className="text-green-500 h-4 w-4" />
                ) : (
                  <LucideAlertCircle className="text-muted-foreground h-4 w-4" />
                )}
                <span>Minimum 8 characters</span>
              </li>
              <li className="flex items-center gap-2">
                {passwordStrength >= 50 ? (
                  <LucideCheckCircle className="text-green-500 h-4 w-4" />
                ) : (
                  <LucideAlertCircle className="text-muted-foreground h-4 w-4" />
                )}
                <span>At least one uppercase letter</span>
              </li>
              <li className="flex items-center gap-2">
                {passwordStrength >= 75 ? (
                  <LucideCheckCircle className="text-green-500 h-4 w-4" />
                ) : (
                  <LucideAlertCircle className="text-muted-foreground h-4 w-4" />
                )}
                <span>At least one number</span>
              </li>
              <li className="flex items-center gap-2">
                {passwordStrength >= 100 ? (
                  <LucideCheckCircle className="text-green-500 h-4 w-4" />
                ) : (
                  <LucideAlertCircle className="text-muted-foreground h-4 w-4" />
                )}
                <span>At least one special character</span>
              </li>
            </ul>
          </div>

          {/* Confirm Password with toggle */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:bg-transparent"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <LucideEyeOff className="h-4 w-4" />
                ) : (
                  <LucideEye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Reset Password Button */}
          <Button
            className="w-full bg-black text-white hover:bg-black/90"
            size="lg"
          >
            Reset Password
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" className="text-sm">
            Back to Sign In
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
}
