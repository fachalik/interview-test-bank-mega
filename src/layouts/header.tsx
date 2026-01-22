"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

import { Container } from "@/components/common/container";
import Logo from "@/components/common/logo";
import {
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import NavFooter from "./nav-footer";
import NavHeader from "./nav-header";
import { NavMain } from "./nav-main";

const Header = () => {
	const pathname = usePathname();
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const isMobile = useIsMobile();

	const handleOpenChange = (open: boolean) => {
		setIsSheetOpen(open);
	};

	return (
		<header className="fixed start-0 end-0 top-0 z-10 flex h-(--header-height) shrink-0 items-center  lg:hidden">
			<Container className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center justify-between gap-[14px]">
					<div className="flex items-center gap-2.5">
						<Logo size="small" />
					</div>
				</div>

				{isMobile && (
					<Sheet
						key={pathname}
						open={isSheetOpen}
						onOpenChange={handleOpenChange}
					>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<span className="text-[24px]">☰</span>
							</Button>
						</SheetTrigger>
						<SheetContent className="w-[281px] gap-0 p-0" side="left">
							<SidebarHeader>
								<NavHeader showSidebarTrigger={false} />
							</SidebarHeader>
							<SidebarContent>
								<NavMain />
							</SidebarContent>
							<SidebarFooter>
								<NavFooter />
							</SidebarFooter>
							<SidebarRail />
						</SheetContent>
					</Sheet>
				)}
			</Container>
		</header>
	);
};

export { Header };
