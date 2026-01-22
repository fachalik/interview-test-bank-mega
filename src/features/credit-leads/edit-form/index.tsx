"use client";

import FormWrapper from "@/components/common/form-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { logger } from "@/lib/logger";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Data } from "..";
import { FormValues, useForm } from "./use-form";

interface IProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	data: Data | null;
	disabled?: boolean;
}

export default function FormEdit({
	open,
	onOpenChange,
	data,
	disabled = false,
}: IProps) {
	const { form, isPending, onSubmit } = useForm({
		onSuccess: () => {
			toast.success("Credit Lead updated successfully");
			onOpenChange?.(false);
			form.reset();
		},
		onError: (error) => {
			logger.error(error);
			toast.error(error);
		},
		data,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	useEffect(() => {
		if (data) {
			form.reset({
				customer_name: data?.customer_name || "",
				amount: data?.amount || "",
			});
		}
	}, [data]);

	const handleCancel = () => {
		form.reset({});
	};

	return (
		<Sheet onOpenChange={onOpenChange} open={open}>
			<SheetContent side="right" className="flex w-full flex-col sm:w-screen">
				<SheetHeader className="shrink-0">
					<SheetTitle>
						{disabled ? "View Credit Lead" : "Edit Credit Lead"}
					</SheetTitle>
					<SheetDescription>
						{disabled
							? "Viewing credit lead details."
							: "Please fill out the form below to edit the credit lead."}
					</SheetDescription>
				</SheetHeader>

				<div className="flex-1 overflow-hidden">
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex h-full flex-col"
					>
						<div className="flex-1 space-y-6 overflow-y-auto pr-2">
							<div className="grid gap-1">
								<FormWrapper<FormValues>
									name="customer_name"
									title="Customer Name"
									required
									errors={form.formState.errors}
								>
									<Input
										{...form.register("customer_name")}
										placeholder="Enter new customer name"
										error={!!form.formState.errors.customer_name}
										type="text"
									/>
								</FormWrapper>

								<FormWrapper<FormValues>
									name="amount"
									title="Amount"
									required
									errors={form.formState.errors}
								>
									<Input
										{...form.register("amount")}
										placeholder="Enter new amount"
										error={!!form.formState.errors.amount}
										type="text"
									/>
								</FormWrapper>
							</div>
						</div>

						<SheetFooter className="flex shrink-0 gap-2 border-t pt-4">
							<SheetClose asChild>
								<Button
									variant="outline"
									type="button"
									onClick={handleCancel}
									disabled={isPending || disabled}
								>
									Cancel
								</Button>
							</SheetClose>
							<Button type="submit" disabled={isPending || disabled}>
								{isPending ? (
									<div className="flex items-center">
										<Loader
											className="mr-2 inline-block animate-spin"
											size={16}
										/>
										Updating...
									</div>
								) : (
									"Update Credit Leads"
								)}
							</Button>
						</SheetFooter>
					</form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
