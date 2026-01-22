"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandCheck, CommandItem } from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Loader, Search } from "lucide-react";
import * as React from "react";

export type Option = {
	value: string;
	label: string | React.ReactNode;
};

type SingleSelectProps = {
	options: Option[];
	selectedValue: string | null;
	onChange: (selected: string | null) => void;
	placeholder?: string;
	emptyText?: string;
	className?: string;
	disabled?: boolean;
	loading?: boolean;
};

export default function SingleSelect({
	options,
	selectedValue,
	onChange,
	placeholder = "Select option",
	emptyText = "No option found.",
	className = "",
	disabled = false,
	loading = false,
}: SingleSelectProps) {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = React.useState("");

	const handleSelect = (value: string) => {
		if (selectedValue === value) {
			onChange(null);
		} else {
			onChange(value);
			setOpen(false);
		}
	};

	const selectedOption = options.find((o) => o.value === selectedValue);

	const filteredOptions = options.filter((option) =>
		typeof option.label === "string"
			? option.label.toLowerCase().includes(search.toLowerCase())
			: option.value.toLowerCase().includes(search.toLowerCase()),
	);

	if (loading) {
		return (
			<div className={`w-full ${className}`}>
				<Button
					variant="outline"
					role="combobox"
					autoHeight={true}
					mode="input"
					className="w-full p-1 relative"
					disabled={true}
				>
					<div className="flex items-center gap-2 justify-center w-full">
						<Loader className="animate-spin h-4 w-4" />
					</div>
				</Button>
			</div>
		);
	}

	return (
		<div className={`w-full ${className}`}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						asChild
						variant="outline"
						role="combobox"
						aria-expanded={open}
						autoHeight={true}
						mode="input"
						placeholder={!selectedValue}
						className="w-full p-1 relative"
						disabled={disabled}
					>
						<div className="flex items-center gap-1 pe-2.5 px-2.5">
							{selectedOption ? (
								<span className="truncate">{selectedOption.label}</span>
							) : (
								placeholder
							)}
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-(--radix-popper-anchor-width) p-0">
					<Command>
						<div
							className="flex items-center border-border border-b px-3"
							cmdk-input-wrapper=""
							data-slot="command-input"
						>
							<Search className="me-2 h-4 w-4 shrink-0 opacity-50" />
							<input
								placeholder="Search..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-hidden text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 outline-none border-none"
							/>
						</div>
						{/**/}

						<div className="max-h-60 overflow-y-auto p-2 space-y-2">
							{filteredOptions.length === 0 && (
								<div className="py-6 text-center text-sm">{emptyText}</div>
							)}

							{filteredOptions.map((option) => (
								<CommandItem
									disabled={disabled}
									key={option.value}
									value={option.value}
									onSelect={() => handleSelect(option.value)}
								>
									{typeof option.label === "string" ? (
										<span className="truncate">{option.label}</span>
									) : (
										option.label
									)}
									{selectedValue === option.value && <CommandCheck />}
								</CommandItem>
							))}
						</div>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
