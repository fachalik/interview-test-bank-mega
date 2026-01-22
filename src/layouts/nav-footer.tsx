import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NavUser } from "./nav-user";

export default function NavFooter() {
	const { open } = useSidebar();
	return (
		<div
			className={cn(
				"h-28 flex flex-col gap-2.5 justify-center items-center px-3",
				!open && "h-13 justify-center",
			)}
		>
			<NavUser />
			{open && <p className="text-xs">© 2025 Skyworx Creative Team.</p>}
		</div>
	);
}
