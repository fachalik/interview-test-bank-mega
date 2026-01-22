import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { LoaderCircle, XIcon } from "lucide-react";

type ButtonVariant =
	| "primary"
	| "destructive"
	| "outline"
	| "mono"
	| "secondary"
	| "dashed"
	| "ghost"
	| "dim"
	| "foreground"
	| "inverse"
	| null
	| undefined;

interface ICustomDialog {
	title: string;
	description: React.ReactNode;
	onOpenChange: () => void;
	onCancel: () => void;
	onConfirm: () => void;
	open: boolean;
	isPending: boolean;
	textCancel?: string;
	textConfirm?: string;
	icon?: React.ReactNode;
	footerPosition?: "center" | "end" | "start";
	confirmButtonVariant?: ButtonVariant;
	cancelButtonVariant?: ButtonVariant;
}

export function DialogComponent({
	title,
	description,
	onOpenChange,
	onCancel,
	onConfirm,
	open,
	isPending,
	textCancel,
	textConfirm,
	icon,
	footerPosition,
	confirmButtonVariant,
	cancelButtonVariant,
}: ICustomDialog) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange} modal>
			<DialogContent className="mx-auto flex max-h-[90vh] w-[calc(100dvw-20px)] max-w-[540px] grow flex-col gap-0 overflow-hidden p-0 [&>button]:hidden">
				{/* <DialogHeader className="mb-0 pt-2.5 px-2.5">

				</DialogHeader> */}

				<div className="flex flex-col items-center space-y-5 px-[30px] py-5">
					<div className="absolute top-1 right-1">
						<Button variant={"ghost"} size={"icon"} onClick={onOpenChange}>
							<XIcon />
						</Button>
					</div>
					{icon && <div>{icon}</div>}
					<div className="space-y-2.5 text-center">
						<p className="text-lg font-semibold">{title}</p>
						{description}
					</div>
				</div>

				<div
					className={cn(
						`flex flex-1 space-x-2.5 overflow-y-auto px-[30px] mb-5`,
						`justify-${footerPosition}`,
					)}
				>
					<Button
						type="button"
						disabled={isPending}
						variant={cancelButtonVariant}
						onClick={onCancel}
						className="cursor-pointer"
					>
						{!textCancel ? "Cancel" : textCancel}
					</Button>
					<Button
						type="submit"
						disabled={isPending}
						onClick={onConfirm}
						variant={confirmButtonVariant}
						className="text-white cursor-pointer"
					>
						{isPending ? (
							<div className="flex items-center gap-2.5">
								<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								Loading ...
							</div>
						) : !textConfirm ? (
							"Submit"
						) : (
							textConfirm
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
