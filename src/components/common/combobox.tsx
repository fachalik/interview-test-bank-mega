"use client";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";

interface StatusOption {
	value: string;
	label: string;
}

interface IProps {
	options: StatusOption[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	className?: React.HTMLAttributes<HTMLButtonElement>["className"];
	isSearchable?: boolean;
	disabled?: boolean;
}

export default function Combobox({
	options,
	value,
	onChange,
	placeholder,
	className,
	isSearchable = false,
	disabled = false,
}: IProps) {
	const [open, setOpen] = React.useState(false);
	const [internalValue, setInternalValue] = React.useState(value);
	const [search, setSearch] = React.useState("");

	const selectedStatus = options.find(
		(status) => status.value === internalValue,
	);

	const filteredOptions = isSearchable
		? options.filter((status) =>
				status.label.toLowerCase().includes(search.toLowerCase()),
			)
		: options;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					disabled={disabled}
					variant="outline"
					role="combobox"
					aria-expanded={open}
				>
					{selectedStatus ? (
						<span className="flex items-center gap-2.5">
							<span className="truncate">{selectedStatus.label}</span>
						</span>
					) : (
						<span>{placeholder || "Select status..."}</span>
					)}
					<ChevronDown className="ml-auto size-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-(--radix-popper-anchor-width) p-0">
				<div>
					{isSearchable && (
						<div className="p-3">
							<input
								type="text"
								placeholder="Search ..."
								className="w-full rounded border px-2 py-1"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
					)}
					<div>
						{filteredOptions.length === 0 ? (
							<div className="text-muted-foreground p-3">No data found.</div>
						) : (
							<div>
								{filteredOptions.map((status) => (
									<div
										key={status.value}
										role="option"
										aria-selected={value === status.value}
										tabIndex={0}
										className={cn(
											"hover:bg-accent flex cursor-pointer items-center justify-between px-4 py-2",
											value === status.value && "bg-accent",
										)}
										onClick={() => {
											const newValue =
												status.value === internalValue ? "" : status.value;
											setInternalValue(newValue);
											if (onChange) onChange(newValue);
											setOpen(false);
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												const newValue =
													status.value === internalValue ? "" : status.value;
												setInternalValue(newValue);
												if (onChange) onChange(newValue);
												setOpen(false);
											}
										}}
									>
										<span className="flex items-center gap-2.5">
											<span className="truncate">{status.label}</span>
										</span>
										{value === status.value && (
											<span className="text-primary ml-2">&#10003;</span>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
