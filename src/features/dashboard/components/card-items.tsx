import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
	title: string;
	value: number | string | React.ReactNode;
	postFix?: string;
	textColor?: "red" | "blue" | "green" | "yellow";
	className?: string;
}

export default function CardItem({
	title,
	value,
	postFix,
	textColor,
	className,
}: IProps) {
	const textColorClass = {
		red: "text-red-700",
		blue: "text-blue-700",
		green: "text-green-700",
		yellow: "text-yellow-700",
	};

	const mapValue = (val: number | string | React.ReactNode) => {
		if (typeof val === "number") {
			return val.toLocaleString();
		}

		if (typeof val === "string") {
			return val;
		}

		return val;
	};

	return (
		<Card variant={"simple"} className={className}>
			<CardHeader className="flex w-full items-start!">
				<CardTitle className="text-lg font-semibold text-gray-500 w-[70%]">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p
					className={cn(
						"text-4xl text-end",
						textColor && textColorClass[textColor],
					)}
				>
					{mapValue(value)} {postFix}
				</p>
			</CardContent>
		</Card>
	);
}
