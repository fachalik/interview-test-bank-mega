"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

import RemixIcon from "@/components/common/remix-icon";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
// import { useUser } from "@/context/UserContext";
import type { Menu } from "./config.menu";
import { configMenu } from "./config.menu";

/**
 * Navigation item structure
 */

/**
 * NavMain - Main navigation component for the sidebar
 *
 * Renders a collapsible navigation menu with support for nested sub-items.
 * Top-level items without sub-items are rendered as direct links, while
 * items with sub-items are rendered as expandable/collapsible sections.
 */
export function NavMain() {
	const pathname = usePathname();
	// const { user } = useUser();

	const menus = configMenu;
	// const { menus } = user ?? { menus: [] };
	/**
	 * Determine whether a path should be considered active.
	 * Matches exact path or as a prefix followed by a slash:
	 * - path === pathname
	 * - pathname.startsWith(path + "/")
	 * This avoids partial matches like "/app" matching "/appsomething".
	 */
	const isActive = useCallback(
		(path: string) => {
			if (!path) return false;
			if (path === "/") return pathname === "/";
			return pathname === path || pathname.startsWith(path + "/");
		},
		[pathname],
	);

	// Return nothing if there's no menu data
	if (!menus.length) return null;

	const hasActiveSubItem = (subItems?: Menu[]) => {
		if (!subItems || !subItems.length) return false;
		return subItems.some((s) => isActive(s.path));
	};

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Menu</SidebarGroupLabel>

			<SidebarMenu>
				{menus.map((item) => {
					const hasSubItems =
						Array.isArray(item.childrens) && item.childrens.length > 0;

					const shouldExpand =
						isActive(item.path) || hasActiveSubItem(item.childrens);

					return (
						<Collapsible
							key={item.path}
							asChild
							className="group/collapsible"
							defaultOpen={shouldExpand}
						>
							<SidebarMenuItem>
								{!hasSubItems ? (
									<Link
										href={item.path}
										aria-current={isActive(item.path) ? "page" : undefined}
									>
										<SidebarMenuButton
											tooltip={item.name}
											isActive={isActive(item.path)}
											aria-current={isActive(item.path) ? "page" : undefined}
										>
											{item.menu_icon && <RemixIcon icon={item.menu_icon} />}
											<span>{item.name}</span>
										</SidebarMenuButton>
									</Link>
								) : (
									<CollapsibleTrigger asChild>
										<SidebarMenuButton
											tooltip={item.name}
											isActive={
												isActive(item.path) || hasActiveSubItem(item.childrens)
											}
											aria-expanded={shouldExpand}
										>
											{item.menu_icon && <RemixIcon icon={item.menu_icon} />}
											<span>{item.name}</span>
											<ChevronRight className="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
								)}

								{hasSubItems && (
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.childrens!.map((subItem) => (
												<SidebarMenuSubItem key={subItem.path}>
													<SidebarMenuSubButton
														asChild
														isActive={isActive(subItem.path)}
														aria-current={
															isActive(subItem.path) ? "page" : undefined
														}
													>
														<Link
															href={subItem.path}
															aria-current={
																isActive(subItem.path) ? "page" : undefined
															}
														>
															<span>{subItem.name}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								)}
							</SidebarMenuItem>
						</Collapsible>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
