import { buttonVariants } from "@/components/ui/button";
import { LucideHome } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-8 text-center">
        <h1 className="mb-2 text-6xl font-bold text-foreground">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-muted-foreground">Page Not Found</h2>
        <p className="mb-8 text-muted-foreground">
          {"Sorry, we couldn't find what you're looking for."}
        </p>
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          <LucideHome />
          Home
        </Link>
      </div>
    </div>
  );
}
