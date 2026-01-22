import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
	icon: string;
	className?: React.HTMLAttributes<HTMLElement>["className"];
}

export default function RemixIcon({ icon, className }: IProps) {
	return <i className={cn(`ri-${icon}`, "text-2xl", className)} />;
}
