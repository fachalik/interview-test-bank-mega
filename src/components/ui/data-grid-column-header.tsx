import { Button } from "@/components/ui/button";
import { useDataGrid } from "@/components/ui/data-grid";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext"; // added
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import {
	ArrowDown,
	ArrowLeft,
	ArrowLeftToLine,
	ArrowRight,
	ArrowRightToLine,
	ArrowUp,
	Check,
	ChevronsUpDown,
	PinOff,
	Settings2,
} from "lucide-react";
import { HTMLAttributes, ReactNode } from "react";
import TooltipComponent from "../common/tooltip";

interface DataGridColumnHeaderProps<TData, TValue>
	extends HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title?: string;
	icon?: ReactNode;
	pinnable?: boolean;
	filter?: ReactNode;
	visibility?: boolean;
}

function DataGridColumnHeader<TData, TValue>({
	column,
	title = "",
	icon,
	className,
	filter,
	visibility = false,
}: DataGridColumnHeaderProps<TData, TValue>) {
	const { isLoading, table, props, recordCount } = useDataGrid();
	const { theme } = useTheme(); // added

	const themeClasses = theme === "dark" ? "text-gray-200" : "text-gray-700"; // simple override

	const interactiveBg =
		theme === "dark"
			? "hover:bg-gray-800 data-[state=open]:bg-gray-800"
			: "hover:bg-gray-100 data-[state=open]:bg-gray-100";

	const moveColumn = (direction: "left" | "right") => {
		const currentOrder = [...table.getState().columnOrder];
		const currentIndex = currentOrder.indexOf(column.id);

		if (direction === "left" && currentIndex > 0) {
			const newOrder = [...currentOrder];
			const [movedColumn] = newOrder.splice(currentIndex, 1);
			newOrder.splice(currentIndex - 1, 0, movedColumn);
			table.setColumnOrder(newOrder);
		}

		if (direction === "right" && currentIndex < currentOrder.length - 1) {
			const newOrder = [...currentOrder];
			const [movedColumn] = newOrder.splice(currentIndex, 1);
			newOrder.splice(currentIndex + 1, 0, movedColumn);
			table.setColumnOrder(newOrder);
		}
	};

	const canMove = (direction: "left" | "right"): boolean => {
		const currentOrder = table.getState().columnOrder;
		const currentIndex = currentOrder.indexOf(column.id);
		if (direction === "left") {
			return currentIndex > 0;
		} else {
			return currentIndex < currentOrder.length - 1;
		}
	};

	const headerLabel = () => {
		return (
			<div
				className={cn(
					"font-normal inline-flex h-full items-center gap-1.5 text-[0.8125rem] leading-[calc(1.125/0.8125)] [&_svg]:size-3.5 [&_svg]:opacity-60",
					themeClasses,
					"max-w-full truncate",
					className,
				)}
				title={title}
			>
				{icon && icon}
				<span className="hidden sm:inline truncate">{title}</span>
				<span className="sm:hidden truncate">
					{typeof title === "string" ? title.slice(0, 3) : title}
				</span>
			</div>
		);
	};

	const headerButton = () => {
		return (
			<TooltipComponent
				content={`${title}: hold shift to multi-sort`}
				side="top"
			>
				<Button
					variant="ghost"
					className={cn(
						"rounded-md -ms-2 px-2 h-7",
						interactiveBg,
						themeClasses,
						"hover:text-foreground data-[state=open]:text-foreground flex items-center gap-1 max-w-full",
						"sm:justify-start justify-center",
						className,
					)}
					disabled={isLoading || recordCount === 0}
					onClick={column.getToggleSortingHandler()}
					title={title}
				>
					{icon && icon}
					<span className="hidden sm:inline truncate">{title}</span>
					<span className="sm:hidden truncate">
						{typeof title === "string" ? title.slice(0, 3) : title}
					</span>
					{column.getCanSort() &&
						(column.getIsSorted() === "desc" ? (
							<ArrowDown className="size-[0.7rem]! mt-px shrink-0" />
						) : column.getIsSorted() === "asc" ? (
							<ArrowUp className="size-[0.7rem]! mt-px shrink-0" />
						) : (
							<ChevronsUpDown className="size-[0.7rem]! mt-px shrink-0" />
						))}
				</Button>
			</TooltipComponent>
		);
	};

	const headerPin = () => {
		return (
			<Button
				size="sm"
				variant="ghost"
				className={cn(
					"size-7 rounded-md",
					interactiveBg,
					themeClasses,
					"flex items-center justify-center",
				)}
				onClick={() => column.pin(false)}
				aria-label={`Unpin ${title} column`}
				title={`Unpin ${title} column`}
			>
				<PinOff className="size-3.5! opacity-60!" aria-hidden="true" />
			</Button>
		);
	};

	const headerControls = () => {
		return (
			<div className="flex items-center h-full gap-1.5 justify-between w-full">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>{headerButton()}</DropdownMenuTrigger>
					<DropdownMenuContent
						className={cn(
							"w-48 sm:w-60",
							theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white",
						)}
						align="start"
					>
						{filter && <DropdownMenuLabel>{filter}</DropdownMenuLabel>}

						{filter &&
							(column.getCanSort() || column.getCanPin() || visibility) && (
								<DropdownMenuSeparator />
							)}

						{column.getCanSort() && (
							<>
								<DropdownMenuItem
									onClick={() => {
										if (column.getIsSorted() === "asc") {
											column.clearSorting();
										} else {
											column.toggleSorting(false);
										}
									}}
									disabled={!column.getCanSort()}
								>
									<ArrowUp className="size-3.5!" />
									<span className="grow">Asc</span>
									{column.getIsSorted() === "asc" && (
										<Check className="size-4 opacity-100! text-primary" />
									)}
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										if (column.getIsSorted() === "desc") {
											column.clearSorting();
										} else {
											column.toggleSorting(true);
										}
									}}
									disabled={!column.getCanSort()}
								>
									<ArrowDown className="size-3.5!" />
									<span className="grow">Desc</span>
									{column.getIsSorted() === "desc" && (
										<Check className="size-4 opacity-100! text-primary" />
									)}
								</DropdownMenuItem>
							</>
						)}

						{(filter || column.getCanSort()) &&
							(column.getCanSort() || column.getCanPin() || visibility) && (
								<DropdownMenuSeparator />
							)}

						{props.tableLayout?.columnsPinnable && column.getCanPin() && (
							<>
								<DropdownMenuItem
									onClick={() =>
										column.pin(column.getIsPinned() === "left" ? false : "left")
									}
								>
									<ArrowLeftToLine className="size-3.5!" aria-hidden="true" />
									<span className="grow">Pin left</span>
									{column.getIsPinned() === "left" && (
										<Check className="size-4 opacity-100! text-primary" />
									)}
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										column.pin(
											column.getIsPinned() === "right" ? false : "right",
										)
									}
								>
									<ArrowRightToLine className="size-3.5!" aria-hidden="true" />
									<span className="grow">Pin right</span>
									{column.getIsPinned() === "right" && (
										<Check className="size-4 opacity-100! text-primary" />
									)}
								</DropdownMenuItem>
							</>
						)}

						{props.tableLayout?.columnsMovable && (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => moveColumn("left")}
									disabled={!canMove("left") || column.getIsPinned() !== false}
								>
									<ArrowLeft className="size-3.5!" aria-hidden="true" />
									<span>Move left</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => moveColumn("right")}
									disabled={!canMove("right") || column.getIsPinned() !== false}
								>
									<ArrowRight className="size-3.5!" aria-hidden="true" />
									<span>Move right</span>
								</DropdownMenuItem>
							</>
						)}

						{props.tableLayout?.columnsVisibility &&
							visibility &&
							(column.getCanSort() || column.getCanPin() || filter) && (
								<DropdownMenuSeparator />
							)}

						{props.tableLayout?.columnsVisibility && visibility && (
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<Settings2 className="size-3.5!" />
									<span>Columns</span>
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent
										className={cn(
											theme === "dark"
												? "bg-gray-900 text-gray-200"
												: "bg-white",
										)}
									>
										{table
											.getAllColumns()
											.filter(
												(col) =>
													typeof col.accessorFn !== "undefined" &&
													col.getCanHide(),
											)
											.map((col) => {
												return (
													<DropdownMenuCheckboxItem
														key={col.id}
														checked={col.getIsVisible()}
														onSelect={(event) => event.preventDefault()}
														onCheckedChange={(value) =>
															col.toggleVisibility(!!value)
														}
														className="capitalize"
													>
														{col.columnDef.meta?.headerTitle || col.id}
													</DropdownMenuCheckboxItem>
												);
											})}
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
				{props.tableLayout?.columnsPinnable &&
					column.getCanPin() &&
					column.getIsPinned() &&
					headerPin()}
			</div>
		);
	};

	if (
		props.tableLayout?.columnsMovable ||
		(props.tableLayout?.columnsVisibility && visibility) ||
		(props.tableLayout?.columnsPinnable && column.getCanPin()) ||
		filter
	) {
		return headerControls();
	}

	if (
		column.getCanSort() ||
		(props.tableLayout?.columnsResizable && column.getCanResize())
	) {
		return (
			<div className="flex items-center h-full w-full">{headerButton()}</div>
		);
	}

	return headerLabel();
}

export { DataGridColumnHeader, type DataGridColumnHeaderProps };
