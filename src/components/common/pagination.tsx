import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PaginationProps {
	page: number;
	pageSize: number;
	totalPages: number;
	recordCount: number;
	isLoading?: boolean;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
	sizes?: number[];
	sizesLabel?: string;
	sizesDescription?: string;
	sizesSkeleton?: ReactNode;
	more?: boolean;
	moreLimit?: number;
	info?: string;
	infoSkeleton?: ReactNode;
	className?: string;
}

function Pagination(props: PaginationProps) {
	const {
		page,
		pageSize,
		totalPages,
		recordCount,
		isLoading,
		onPageChange,
		onPageSizeChange,
		sizes = [5, 10, 15, 20, 25, 50, 100],
		sizesLabel = "Show",
		sizesDescription = "per page",
		sizesSkeleton = <Skeleton className="h-8 w-44" />,
		moreLimit = 5,
		info = "{from} - {to} of {count}",
		infoSkeleton = <Skeleton className="h-8 w-60" />,
		className,
	} = props;

	const btnBaseClasses = "size-7 p-0 text-sm";
	const btnArrowClasses = `${btnBaseClasses} rtl:transform rtl:rotate-180`;
	const pageIndex = page - 1;
	const from = pageIndex * pageSize + 1;
	const to = Math.min((pageIndex + 1) * pageSize, recordCount);

	const paginationInfo = info
		.replace("{from}", from.toString())
		.replace("{to}", to.toString())
		.replace("{count}", recordCount.toString());

	const paginationMoreLimit = moreLimit;
	const currentGroupStart =
		Math.floor(pageIndex / paginationMoreLimit) * paginationMoreLimit;
	const currentGroupEnd = Math.min(
		currentGroupStart + paginationMoreLimit,
		totalPages,
	);

	const renderPageButtons = () => {
		const buttons = [];
		for (let i = currentGroupStart; i < currentGroupEnd; i++) {
			buttons.push(
				<Button
					key={i}
					size="sm"
					variant="ghost"
					className={cn(btnBaseClasses, "text-muted-foreground", {
						"bg-accent text-accent-foreground": pageIndex === i,
					})}
					onClick={() => {
						if (pageIndex !== i) {
							onPageChange(i + 1);
						}
					}}
				>
					{i + 1}
				</Button>,
			);
		}
		return buttons;
	};

	const renderEllipsisPrevButton = () => {
		if (currentGroupStart > 0) {
			return (
				<Button
					size="sm"
					className={btnBaseClasses}
					variant="ghost"
					onClick={() => onPageChange(currentGroupStart)}
				>
					...
				</Button>
			);
		}
		return null;
	};

	const renderEllipsisNextButton = () => {
		if (currentGroupEnd < totalPages) {
			return (
				<Button
					className={btnBaseClasses}
					variant="ghost"
					size="sm"
					onClick={() => onPageChange(currentGroupEnd + 1)}
				>
					...
				</Button>
			);
		}
		return null;
	};

	return (
		<div
			data-slot="data-grid-pagination"
			className={cn(
				"flex grow flex-col flex-wrap items-center justify-between gap-2.5 py-2.5 sm:flex-row sm:py-0",
				className,
			)}
		>
			<div className="order-2 flex flex-wrap items-center space-x-2.5 pb-2.5 sm:order-1 sm:pb-0">
				{isLoading ? (
					sizesSkeleton
				) : (
					<>
						<div className="text-muted-foreground text-sm">{sizesLabel}</div>
						<Select
							value={`${pageSize}`}
							indicatorPosition="right"
							onValueChange={(value) => {
								const newPageSize = Number(value);
								onPageSizeChange(newPageSize);
							}}
						>
							<SelectTrigger className="w-fit" size="sm">
								<SelectValue placeholder={`${pageSize}`} />
							</SelectTrigger>
							<SelectContent side="top" className="min-w-[50px]">
								{sizes.map((size: number) => (
									<SelectItem key={size} value={`${size}`}>
										{size}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<div className="text-muted-foreground text-sm">
							{sizesDescription}
						</div>
					</>
				)}
			</div>
			<div className="order-1 flex flex-col items-center justify-center gap-2.5 pt-2.5 sm:order-2 sm:flex-row sm:justify-end sm:pt-0">
				{isLoading ? (
					infoSkeleton
				) : (
					<>
						<div className="order-2 text-nowrap text-muted-foreground text-sm sm:order-1">
							{paginationInfo}
						</div>
						{totalPages > 1 && (
							<div className="order-1 flex items-center space-x-1 sm:order-2">
								<Button
									size="sm"
									variant="ghost"
									className={btnArrowClasses}
									onClick={() => onPageChange(page - 1)}
									disabled={page <= 1}
								>
									<span className="sr-only">Go to previous page</span>
									<ChevronLeftIcon className="size-4" />
								</Button>

								{renderEllipsisPrevButton()}

								{renderPageButtons()}

								{renderEllipsisNextButton()}

								<Button
									size="sm"
									variant="ghost"
									className={btnArrowClasses}
									onClick={() => onPageChange(page + 1)}
									disabled={page >= totalPages}
								>
									<span className="sr-only">Go to next page</span>
									<ChevronRightIcon className="size-4" />
								</Button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export { Pagination };
