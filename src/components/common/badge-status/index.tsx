import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EnumStatus } from "./types";

interface StatusBadgeProps {
	status: EnumStatus;
	className?: string;
}

const getStatusConfig = (status: EnumStatus) => {
	switch (status) {
		case EnumStatus.TRAINED:
			return {
				label: "Trained",
				variant: "secondary" as const,
				className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
			};
		case EnumStatus.DEPLOYED:
			return {
				label: "Deployed",
				variant: "secondary" as const,
				className: "bg-green-100 text-green-800 hover:bg-green-100",
			};

		case EnumStatus.FAILED:
			return {
				label: "Failed",
				variant: "destructive" as const,
				className: "bg-red-100 text-red-800 hover:bg-red-100",
			};
		case EnumStatus.MISSING:
			return {
				label: "Missing",
				variant: "warning" as const,
				className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
			};
		case EnumStatus.PROCESSING:
			return {
				label: "Processing",
				variant: "info" as const,
				className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
			};
		default:
			return {
				label: "Unknown",
				variant: "secondary" as const,
				className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
			};
	}
};

export function parseStatus(value: string): EnumStatus {
	if (Object.values(EnumStatus).includes(value as unknown as EnumStatus)) {
		return value as unknown as EnumStatus;
	}
	return EnumStatus.MISSING;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
	const config = getStatusConfig(status);

	return (
		<Badge variant={config.variant} className={cn(config.className, className)}>
			{config.label}
		</Badge>
	);
};
