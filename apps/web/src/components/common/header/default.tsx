import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { LucideSearch } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { HeaderNavigation } from "./navigation";
import { UserMenu } from "./user-menu";

export const Header = () => {
	const { data } = authClient.useSession();
	const { pathname } = useLocation();
	return (
		<header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-6">
						<Link to="/" className="font-sans text-3xl">
							Acora
						</Link>
						<HeaderNavigation />
					</div>
					<div className="flex items-center space-x-3">
						<Button variant="outline" size="icon">
							<LucideSearch />
						</Button>
						<ModeToggle />
						{data?.user ? (
							<UserMenu />
						) : (
							<Link
								to="/auth"
								search={{
									redirectTo: pathname,
								}}
								className={cn(buttonVariants({ variant: "outline" }))}
							>
								Sign In
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
