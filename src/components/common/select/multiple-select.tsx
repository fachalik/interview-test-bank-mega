"use client";

import { Badge, BadgeButton } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandCheck,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Loader, X } from "lucide-react";
import * as React from "react";

type Option = {
	value: string;
	label: string | React.ReactNode;
};

type MultipleSelectProps = {
	options: Option[];
	selectedValues: string[];
	onChange: (selected: string[]) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	loading?: boolean;
};

export default function MultipleSelect({
	options,
	selectedValues,
	onChange,
	placeholder = "Select options",
	className = "",
	disabled = false,
	loading = false,
}: MultipleSelectProps) {
	const [open, setOpen] = React.useState(false);

	const toggleSelection = (value: string) => {
		if (selectedValues.includes(value)) {
			onChange(selectedValues.filter((v) => v !== value));
		} else {
			onChange([...selectedValues, value]);
		}
	};

	const removeSelection = (value: string) => {
		onChange(selectedValues.filter((v) => v !== value));
	};

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
						placeholder={selectedValues.length === 0}
						className="w-full p-1 relative"
						disabled={disabled}
					>
						<div className="flex flex-wrap items-center gap-1 pe-2.5">
							{selectedValues.length > 0 ? (
								selectedValues.map((val) => {
									const option = options.find((o) => o.value === val);
									return option ? (
										<Badge key={val} variant="outline" className="text-primary">
											{option.label}
											<BadgeButton
												asChild
												onClick={(e) => {
													e.stopPropagation();
													removeSelection(val);
												}}
											>
												<X />
											</BadgeButton>
										</Badge>
									) : null;
								})
							) : (
								<span className="px-2.5">{placeholder}</span>
							)}
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-(--radix-popper-anchor-width) p-0">
					<Command>
						<CommandInput placeholder="Search..." />
						<CommandList>
							<CommandEmpty>No option found.</CommandEmpty>
							<CommandGroup>
								{options.map((option) => (
									<CommandItem
										disabled={disabled}
										key={option.value}
										value={option.value}
										onSelect={() => toggleSelection(option.value)}
									>
										{option.label instanceof String ? (
											<span className="truncate">{option.label}</span>
										) : (
											option.label
										)}
										{selectedValues.includes(option.value) && <CommandCheck />}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
