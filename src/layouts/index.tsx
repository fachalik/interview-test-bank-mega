"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useBodyClass } from "@/hooks/use-body-class";
import { useIsMobile } from "@/hooks/use-mobile";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";

interface IDashboardLayout {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayout) {
	const isMobile = useIsMobile();

	useBodyClass(`
    [--header-height:60px]
    [--sidebar-width:270px]
    lg:overflow-auto
		bg-[#F6F6FA]
  `);

	return (
		<SidebarProvider>
			<div className="flex grow">
				<Header />

				{!isMobile && <AppSidebar />}
				<SidebarInset>
					<div className="flex flex-1 flex-col gap-4 lg:m-0 mt-15">
						{children}
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
