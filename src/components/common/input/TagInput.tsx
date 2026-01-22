"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { toast } from "sonner";

interface TagInputProps {
	value?: string[];
	onChange?: (tags: string[]) => void;
	placeholder?: string;
	className?: string;
	error?: boolean;
	type?: string;
}

const inputVariants = cva(
	`
    flex items-center gap-2.5 w-full bg-background border border-input shadow-xs shadow-black/5 transition-[color,box-shadow] text-foreground placeholder:text-muted-foreground/80
    focus-visible:ring-ring/30  focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px]
    disabled:cursor-not-allowed disabled:opacity-60
    [&[readonly]]:bg-muted/80 [&[readonly]]:cursor-not-allowed
    file:h-full [&[type=file]]:py-0 file:border-solid file:border-input file:bg-transparent
    file:font-medium file:not-italic file:text-foreground file:p-0 file:border-0 file:border-e
    aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20
  `,
);

export default function TagInput({
	value = [],
	onChange,
	placeholder,
	className,
	error,
	type = "text",
}: TagInputProps) {
	const [input, setInput] = useState("");

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (
			(e.key === "Enter" || e.key === ",") &&
			input.trim() &&
			!value.includes(input.trim())
		) {
			const newTags = [...value, input.trim()];
			onChange?.(newTags);
			setInput("");
			e.preventDefault();
		} else {
			if (e.key === "Enter" || e.key === ",") {
				toast.error("Tag is empty or already exists");
				e.preventDefault();
			}
		}
		if (e.key === "Backspace" && !input && value.length) {
			const newTags = value.slice(0, -1);
			onChange?.(newTags);
		}
	};

	const handleRemoveTag = (index: number) => {
		const newTags = value.filter((_, i) => i !== index);
		onChange?.(newTags);
	};

	return (
		<div
			className={cn(
				"text-[0.8125rem] leading-(--text-sm--line-height) rounded-md px-3 py-2",
				inputVariants(),
				className,
				error && "border-red-400 text-red-400",
				error && type === "file" && "file:text-red-400",
			)}
			role="list"
		>
			<div className="flex flex-wrap gap-1">
				{value.map((tag, idx) => (
					<Badge
						key={idx}
						className="flex items-center space-x-1 px-2"
						role="listitem"
					>
						{tag}
						<button
							type="button"
							style={{
								marginLeft: 6,
								cursor: "pointer",
								fontWeight: "bold",
								fontSize: 12,
								background: "none",
								border: "none",
								padding: 0,
								lineHeight: 1,
							}}
							onClick={() => handleRemoveTag(idx)}
							aria-label={`Remove ${tag}`}
							tabIndex={0}
						>
							×
						</button>
					</Badge>
				))}
				<input
					className="outline-none border-none bg-transparent shadow-none p-0 m-0 focus:outline-none focus:ring-0 flex-1 min-w-[80px]"
					placeholder={placeholder}
					value={input}
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
					type={type}
					aria-label={placeholder || "Add tag"}
				/>
			</div>
		</div>
	);
}
