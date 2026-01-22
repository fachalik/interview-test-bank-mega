"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBreadCrumb({ title }: { title?: string }) {
	const pathname = usePathname();

	// Generate breadcrumb segments from pathname
	const segments = pathname.split("/").filter(Boolean);

	// Convert segment to readable title
	const formatTitle = (segment: string) => {
		return segment
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
			{/* Title */}
			{title && (
				<div className="text-lg font-semibold order-1 sm:order-none">
					{title}
				</div>
			)}

			{/* Breadcrumb Navigation */}
			<Breadcrumb className="order-2 sm:order-none overflow-x-auto">
				<BreadcrumbList className="flex-nowrap">
					<BreadcrumbItem className="whitespace-nowrap">
						<BreadcrumbLink asChild>
							<Link
								href="/dashboard"
								className="text-gray-600 hover:text-gray-900 text-sm sm:text-base"
							>
								Dashboard
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>

					{segments.map((segment, index) => {
						const href = "/" + segments.slice(0, index + 1).join("/");
						const isLast = index === segments.length - 1;

						return (
							<div key={segment} className="flex items-center gap-2 sm:gap-2.5">
								<BreadcrumbSeparator className="text-gray-400" />
								<BreadcrumbItem className="whitespace-nowrap">
									{isLast ? (
										<BreadcrumbPage className="text-gray-900 font-medium text-sm sm:text-base">
											{formatTitle(segment)}
										</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild>
											<Link
												href={href}
												className="text-gray-600 hover:text-gray-900 text-sm sm:text-base"
											>
												{formatTitle(segment)}
											</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
							</div>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}
