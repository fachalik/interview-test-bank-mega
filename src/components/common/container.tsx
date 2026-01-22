import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ReactNode } from "react";

const containerVariants = cva("mx-auto w-full px-4 lg:px-6", {
	variants: {
		width: {
			fixed: "max-w-7xl",
			fluid: "",
		},
	},
	defaultVariants: {
		width: "fixed",
	},
});

interface ContainerProps extends VariantProps<typeof containerVariants> {
	children?: ReactNode;
	width?: "fixed" | "fluid";
	className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
	return (
		<div
			data-slot="container"
			className={cn(containerVariants({ width: "fluid" }), className, "p-4")}
		>
			{children}
		</div>
	);
}
