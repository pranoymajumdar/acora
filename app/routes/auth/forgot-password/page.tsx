import { LucideArrowLeft, LucideMail } from "lucide-react";
import AuthInput from "~/components/auth/input";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

export default function ForgotPassword() {
  return (
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">
            Reset your password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <AuthInput label="Email" placeholder="you@example.com" type="email" icon={LucideMail} />
          </div>

          {/* Send Reset Link Button */}
          <Button
            className="w-full bg-black text-white hover:bg-black/90"
            size="lg"
          >
            Send Reset Link
          </Button>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground space-y-2 p-3 bg-slate-50 rounded-md">
            <p>Once you submit your email:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Check your inbox for an email from us</li>
              <li>Click the reset link in the email</li>
              <li>Create your new password</li>
            </ol>
            <p className="mt-2 text-xs">
              Didn't receive an email? Check your spam folder or{" "}
              <Button variant="link" className="p-0 h-auto font-normal text-xs">
                request a new link
              </Button>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button href="/sign-in" variant="link" className="text-sm">
            <LucideArrowLeft size={16} />
            <span>Back to Sign In</span>
          </Button>
        </CardFooter>
      </Card>
  );
}
