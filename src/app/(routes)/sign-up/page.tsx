import { SignUpForm } from "@/components/forms/sign-up";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignUpPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              We just need a few details to get you started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignUpForm afterSignUp="redirect" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SignUpPage;
