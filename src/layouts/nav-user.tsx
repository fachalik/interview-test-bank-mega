import { Bell, ChevronsUpDown, CircleUser, LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

import { LogoutDialog } from "@/components/common/logout-dialog";
import { useUser } from "@/context/UserContext";
import useBoolean from "@/hooks/use-boolean";
import Link from "next/link";
import { toast } from "sonner";

export function NavUser() {
	const { user } = useUser();

	const { isMobile } = useSidebar();
	const { active, toggle } = useBoolean();

	console.log("NavUser - Current User:", user);

	const UserAvatar = () => {
		const initials = user
			? user?.name
					.split(" ")
					.map((n) => n[0])
					.join("")
					.toUpperCase()
			: "U";
		return <span>{initials}</span>;
	};

	return (
		<>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								tooltip={"User Profile"}
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<Avatar className="mr-3 size-10 border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-600">
									<AvatarFallback>
										<UserAvatar />
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{user?.name ?? ""}
									</span>
									<span className="truncate text-xs">{user?.email ?? ""}</span>
								</div>
								<ChevronsUpDown className="ml-auto size-4 transition-transform duration-200 data-[state=open]:rotate-180" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
							side={isMobile ? "bottom" : "right"}
							align="end"
							sideOffset={4}
						>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarFallback>
											<UserAvatar />
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{user?.name}</span>
										<span className="truncate text-xs">{user?.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<Link href="/account">
									<DropdownMenuItem>
										<CircleUser />
										Account
									</DropdownMenuItem>
								</Link>

								<DropdownMenuItem>
									<Bell />
									Notifications
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={toggle}>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
			<LogoutDialog
				open={active}
				onClose={toggle}
				onSuccess={() =>
					toast.success("Logged out successfully", { duration: 2000 })
				}
			/>
		</>
	);
}
