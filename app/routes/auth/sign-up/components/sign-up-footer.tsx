import { Link } from "react-router";
import { Button, buttonVariants } from "~/components/ui/button";
import { CardFooter } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export const SignUpFooter = () => {
  return (
    <CardFooter className="grid gap-2">
        {/* Terms And Confitions */}
      <p className="text-xs text-muted-foreground text-center">
        By creating an account, you agree to our
        <Button variant="link" className="p-0 h-auto mx-1 font-normal text-xs">
          Terms of Service
        </Button>
        and
        <Button variant="link" className="p-0 h-auto mx-1 font-normal text-xs">
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
              className: "text-sm",
            })
          )}
        >
          Sign in
        </Link>
      </div>
    </CardFooter>
  );
};
