import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface IProps {
	content?: React.ReactNode | string;
	children: React.ReactNode;
	side?: "top" | "bottom" | "left" | "right";
}
export default function TooltipComponent({
	content,
	children,
	side = "top",
}: IProps) {
	// helper to map content
	const MapContent = ({
		content,
	}: {
		content: React.ReactNode | string | undefined;
	}) => {
		if (typeof content === "string") {
			return <p>{content}</p>;
		}
		return content;
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side={side} className="w-full max-w-2xl">
					<MapContent content={content} />
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
