import Logo from "@/components/common/logo";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
	showSidebarTrigger?: boolean;
};
export default function NavHeader({ showSidebarTrigger = true }: Props) {
	const { open } = useSidebar();
	return (
		<div
			className={cn(
				"h-13 flex justify-between items-center px-3",
				!open && "h-12 justify-center",
			)}
		>
			{open && (
				<div className="flex items-center gap-2.5">
					<Logo size="small" />
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>
					<Image
						src="/images/skyworx-logo.svg"
						alt="Logo"
						width={110}
						height={30}
					/>
				</div>
			)}

			{!open && <Logo size="small" />}

			{open && showSidebarTrigger && <SidebarTrigger className="-ml-1" />}
		</div>
	);
}
