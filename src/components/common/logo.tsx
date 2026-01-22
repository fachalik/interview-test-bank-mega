import { cn } from "@/lib/utils";
import { CreditCardIcon } from "lucide-react";

export default function Logo({
	className,
	size = "default",
}: {
	className?: string;
	size?: "small" | "default";
}) {
	const sizeClass = size === "small" ? "h-5 w-5" : "h-6 w-6";
	const boxClass = size === "small" ? "p-2" : "p-2.5";

	return (
		<div className={cn("relative bg-primary  rounded-xl", className, boxClass)}>
			<CreditCardIcon className={cn(sizeClass, "text-primary-foreground")} />
		</div>
	);
}
