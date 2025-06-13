import { useState } from "react";
import { redirect } from "react-router";

import { auth } from "~/.server/auth/config";
import { SignInForm } from "~/shared/components/auth/SignInForm";
import { SignUpForm } from "~/shared/components/auth/SignUpForm";
import { AcoraLogo } from "~/shared/components/Logo";
import { Button } from "~/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/shared/components/ui/card";

import type { Route } from "../+types/root";

export async function loader({ request }: Route.LoaderArgs): Promise<void | Response> {
  const url = new URL(request.url);
  const callback = url.searchParams.get("callbackUrl") || "/";
  const session = await auth.api.getSession({ headers: request.headers });
  if (session) {
    return redirect(callback);
  }
}

type MetaData = {
  title: string;
  description: string;
  footer: {
    text: string;
  };
};

type Page = "sign-in" | "sign-up";

function getMetadata(page: Page): MetaData {
  return page === "sign-in"
    ? {
        title: "Sign In",
        description: "Sign in to your account to continue shopping.",
        footer: {
          text: "Don't have an account?",
        },
      }
    : {
        title: "Sign Up",
        description: "Create an account to start shopping with us.",
        footer: { text: "Already have an account?" },
      };
}

function AuthPage() {
  const [page, setPage] = useState<Page>("sign-in");
  const metadata = getMetadata(page);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-[400px] shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto">
            <AcoraLogo showText={false} />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">{metadata.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">{metadata.description}</p>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          {page === "sign-in"
            ? <SignInForm />
            : <SignUpForm />}
        </CardContent>

        <CardFooter className="px-6 py-4 text-sm text-center mx-auto">
          <span>{metadata.footer.text}</span>
          <Button variant="link" size="sm" onClick={() => setPage(prev => prev === "sign-in" ? "sign-up" : "sign-in")}>
            {page === "sign-in" ? "Sign up" : "Sign in"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default AuthPage;
