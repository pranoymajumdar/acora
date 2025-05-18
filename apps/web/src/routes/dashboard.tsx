import { DashboardLayout } from "@/layouts/dashboard";
import {
	Outlet,
	createFileRoute,
	useCanGoBack,
	useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
	component: () => (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	),
	notFoundComponent: () => {
		const router = useRouter();
		const canGoBack = useCanGoBack();
		canGoBack
			? router.history.back()
			: router.navigate({
					to: "/",
				});
	},
});
