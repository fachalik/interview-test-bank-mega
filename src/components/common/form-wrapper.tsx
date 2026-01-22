"use client";
import React from "react";
import { FieldError, FieldErrors, FieldValues } from "react-hook-form";
import { Skeleton } from "../ui/skeleton";

// Generic FormWrapper component for React Hook Form
export default function FormWrapper<T extends FieldValues>({
	children,
	name,
	showError = true,
	required,
	errors,
	title,
	errorPosition = "bottom",
	description,
	showTitle = true,
	isLoading = false,
}: {
	children: React.ReactNode;
	name: string; // <-- changed from keyof T to string
	showError?: boolean;
	required?: boolean;
	errors?: FieldErrors<T>;
	title: string;
	errorPosition?: "bottom" | "start";
	description?: (string | React.ReactNode)[];
	showTitle?: boolean;
	isLoading?: boolean;
}) {
	// Support nested error access
	const fieldError = name
		.split(".")
		.reduce(
			(acc: unknown, key) =>
				acc && typeof acc === "object" && key in acc
					? (acc as Record<string, unknown>)[key]
					: undefined,
			errors,
		) as FieldError | undefined;

	if (isLoading) {
		return <Skeleton className="h-10 w-full rounded-md" />;
	}

	return (
		<div className="flex flex-col gap-2 p-1">
			<div className="w-full">
				<div>
					{showTitle && (
						<label
							htmlFor={name as string}
							className="text-b-13-14-400 text-gray-800 dark:text-white/90 capitalize"
						>
							{title}
							{required && <span className="ml-0.5 text-red-400">*</span>}
						</label>
					)}
					{description && (
						<p className="text-xs text-gray-500 dark:text-gray-400">
							{description.map((desc, index) => {
								if (typeof desc === "string")
									return (
										<span key={index}>
											{desc}
											{index < description.length - 1 && <br />}
										</span>
									);

								return <span key={index}>{desc}</span>;
							})}
						</p>
					)}
				</div>
				{errorPosition === "start" && showError && fieldError && (
					<span className="text-xs text-red-400">{fieldError.message}</span>
				)}
			</div>

			<div className="w-full">
				{children}
				{errorPosition === "bottom" && showError && fieldError && (
					<span className="text-xs text-red-400">{fieldError.message}</span>
				)}
			</div>
		</div>
	);
}
