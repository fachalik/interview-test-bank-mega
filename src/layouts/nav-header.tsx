import Logo from "@/components/common/logo";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

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
				</div>
			)}

			{!open && <Logo size="small" />}

			{open && showSidebarTrigger && <SidebarTrigger className="-ml-1" />}
		</div>
	);
}
