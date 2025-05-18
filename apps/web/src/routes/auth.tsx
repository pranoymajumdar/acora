import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useState } from "react";
import { z } from "zod";

const AuthSearchSchema = z.object({
	redirectTo: z
		.string()
		.startsWith("/")
		.transform((val) => (val.startsWith("/dashboard") ? "/" : val)),
});

export const Route = createFileRoute("/auth")({
	component: RouteComponent,
	validateSearch: zodValidator(AuthSearchSchema),
});

function RouteComponent() {
	const [showSignIn, setShowSignIn] = useState(true);
	const { redirectTo } = Route.useSearch();
	const { data } = authClient.useSession();
	if (data) {
		throw notFound({});
	}
	return showSignIn ? (
		<SignInForm
			redirectTo={redirectTo}
			onSwitchToSignUp={() => setShowSignIn(false)}
		/>
	) : (
		<SignUpForm
			redirectTo={redirectTo}
			onSwitchToSignIn={() => setShowSignIn(true)}
		/>
	);
}
