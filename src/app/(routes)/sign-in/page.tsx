import { SignInForm } from "@/components/forms/sign-in/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignInPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignInForm afterSignIn="redirect" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SignInPage;
