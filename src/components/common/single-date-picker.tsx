"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

type SingleDatePickerProps = {
	value?: Date;
	onChange?: (date: Date | undefined) => void;
	label?: string;
	placeholder?: string;
};

export function SingleDatePicker({
	value,
	onChange,
	label = "Subscription Date",
	placeholder = "June 01, 2025",
}: SingleDatePickerProps) {
	const [open, setOpen] = React.useState(false);
	const [month, setMonth] = React.useState<Date | undefined>(value);

	React.useEffect(() => {
		if (value) setMonth(value);
	}, [value]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					id="date"
					className="w-full justify-between font-normal"
				>
					{value ? value.toLocaleDateString() : "Select date"}
					<ChevronDownIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-auto"
				align="end"
				alignOffset={-8}
				sideOffset={10}
			>
				<Calendar
					mode="single"
					selected={value}
					captionLayout="dropdown"
					month={month}
					onMonthChange={setMonth as (date: Date) => void}
					onSelect={(selectedDate: Date | undefined) => {
						if (onChange) onChange(selectedDate);
						setOpen(false);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
