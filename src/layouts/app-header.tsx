"use client";

import TooltipComponent from "@/components/common/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppHeader({
	title,
	description,
	isBack = false,
}: {
	title?: string;
	description?: string;
	isBack?: boolean;
}) {
	const { open } = useSidebar();
	const pathname = usePathname();

	const backLink = () => {
		const segments = pathname.split("/").filter(Boolean);
		if (segments.length <= 1) {
			return "/";
		} else {
			const parentSegments = segments.slice(0, -1);
			return "/" + parentSegments.join("/");
		}
	};

	const MapItems = () => {
		const segments = pathname.split("/").filter(Boolean);
		const links: string[] = [];
		return segments.slice(0, -1).map((item, index) => {
			links.push(item);
			const href = "/" + links.join("/");
			return (
				<li key={`${item}_${index}`}>
					<Link
						className="inline-flex items-center gap-1.5 text-sm text-gray-500 capitalize dark:text-gray-400"
						href={href}
					>
						{item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, " ")}
						<p>/</p>
					</Link>
				</li>
			);
		});
	};

	return (
		<div className="sticky top-0 z-10 bg-background">
			<header className="flex h-auto md:h-13 my-2 md:m-0 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
				<div className="flex sm:flex-row flex-col justify-between sm:items-center  gap-2 px-4 w-full">
					<div className="flex gap-2.5">
						<div className="flex items-center gap-2">
							{!open && (
								<>
									<SidebarTrigger className="-ml-1" />
									<Separator
										orientation="vertical"
										className="mr-2 data-[orientation=vertical]:h-4"
									/>
								</>
							)}
							{isBack && (
								<TooltipComponent content="Back">
									<Link href={backLink()}>
										<Button variant="ghost" size="icon">
											<ChevronLeftIcon />
										</Button>
									</Link>
								</TooltipComponent>
							)}
							<div className="flex flex-col">
								<p
									className="text-sm font-medium text-gray-800 dark:text-white/90 capitalize
								"
								>
									{title?.toLowerCase()}
								</p>
								{description && (
									<p className="text-xs text-gray-600 dark:text-gray-400">
										{description}
									</p>
								)}
							</div>
						</div>
					</div>
					<nav>
						<ol className="flex items-center gap-1.5">
							<li>
								<Link
									className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
									href="/"
								>
									Dashboard
									<p>/</p>
								</Link>
							</li>
							{MapItems()}
							<li className="text-sm text-gray-800 dark:text-white/90 capitalize">
								{title?.toLowerCase()}
							</li>
						</ol>
					</nav>
				</div>
			</header>
			<Separator />
		</div>
	);
}
