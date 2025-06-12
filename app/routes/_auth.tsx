import { Link, Outlet, redirect, useLocation, useSearchParams } from "react-router";

import { auth } from "~/features/auth/lib/auth.server";
import { AcoraLogo } from "~/shared/components/Logo";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/shared/components/ui/card";

import type { Route } from "./+types/_auth";

export async function loader({ request }: Route.LoaderArgs): Promise<void | Response> {
  const session = await auth.api.getSession({ headers: request.headers });
  if (session) {
    return redirect("/");
  }
}

type MetaData = {
  title: string;
  description: string;
  footer: { text: string; link: string };
};

function getMetadata(page: "sign-in" | "sign-up", callbackUrl: string | null): MetaData {
  return page === "sign-in"
    ? {
        title: "Sign In",
        description: "Sign in to your account to continue shopping.",
        footer: {
          text: "Don't have an account?",
          link: callbackUrl ? `/sign-up?callbackUrl=${callbackUrl}` : "/sign-up",
        },
      }
    : {
        title: "Sign Up",
        description: "Create an account to start shopping with us.",
        footer: {
          text: "Already have an account?",
          link: callbackUrl ? `/sign-in?callbackUrl=${callbackUrl}` : "/sign-in",
        },
      };
}

function AuthLayout() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const page = location.pathname === "/sign-in" ? "sign-in" : "sign-up";

  const metadata = getMetadata(page, searchParams.get("callbackUrl"));

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
          <Outlet />
        </CardContent>

        <CardFooter className="px-6 py-4 text-sm text-center mx-auto">
          {metadata.footer.text}
          <Link to={metadata.footer.link} className="text-primary hover:underline ml-1">
            {page === "sign-in" ? "Sign up" : "Sign in"}
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}

export default AuthLayout;
