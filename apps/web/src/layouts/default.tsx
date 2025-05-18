import Header from "@/components/common/header";
import type { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};
