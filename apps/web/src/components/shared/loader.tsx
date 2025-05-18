import { Loader2 } from "lucide-react";

export const Loader = () => {
	return (
		<div className="flex h-screen items-center justify-center pt-8">
			<Loader2 className="h-10 w-h-10 animate-spin" />
		</div>
	);
};
