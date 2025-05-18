import DashboardSidebar from "@/components/dashboard/sidebar";
import { SiteHeader } from "@/components/dashboard/sidebar/site-header";
import { Loader } from "@/components/shared/loader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
	const { data, isPending } = authClient.useSession();
	const navigate = useNavigate();

	useEffect(() => {
		if (!data && !isPending) {
			navigate({
				to: "/",
			});
		}
	}, [data, navigate, isPending]);

	if (isPending || !data) {
		return <Loader />;
	}
	return (
		<SidebarProvider>
			<DashboardSidebar user={data.user} />
			<SidebarInset>
				<SiteHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
};
