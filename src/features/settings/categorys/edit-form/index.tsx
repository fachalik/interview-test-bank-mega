// "use client";

// import FormWrapper from "@/components/common/form-wrapper";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
// 	Sheet,
// 	SheetClose,
// 	SheetContent,
// 	SheetDescription,
// 	SheetFooter,
// 	SheetHeader,
// 	SheetTitle,
// } from "@/components/ui/sheet";
// import { Textarea } from "@/components/ui/textarea";
// import { logger } from "@/lib/logger";
// import { ProductCategory } from "@/services/product-category/types";
// import { Loader } from "lucide-react";
// import { useEffect } from "react";
// import { toast } from "sonner";
// import { FormValues, useForm } from "./use-form";

// interface IProps {
// 	open?: boolean;
// 	onOpenChange?: (open: boolean) => void;
// 	product_category: ProductCategory | null;
// 	disabled?: boolean;
// }

// export default function FormEdit({
// 	open,
// 	onOpenChange,
// 	product_category,
// 	disabled = false,
// }: IProps) {
// 	const { form, isPending, onSubmit } = useForm({
// 		onSuccess: () => {
// 			toast.success("Category updated successfully");
// 			onOpenChange?.(false);
// 			form.reset();
// 		},
// 		onError: (error) => {
// 			logger.error(error);
// 			toast.error(error);
// 		},
// 		product_category: product_category || null,
// 	});

// 	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
// 	useEffect(() => {
// 		if (product_category) {
// 			form.reset({
// 				name: product_category.name,
// 				description: product_category.description,
// 			});
// 		}
// 	}, [product_category]);

// 	const handleCancel = () => {
// 		form.reset({
// 			name: "",
// 			description: "",
// 		});
// 	};

// 	return (
// 		<Sheet onOpenChange={onOpenChange} open={open}>
// 			<SheetContent side="right" className="flex w-full flex-col sm:w-screen">
// 				<SheetHeader className="shrink-0">
// 					<SheetTitle>
// 						{disabled ? "View Category" : "Edit Category"}
// 					</SheetTitle>
// 					<SheetDescription>
// 						{disabled
// 							? "Viewing category details."
// 							: "Please fill out the form below to edit the category."}
// 					</SheetDescription>
// 				</SheetHeader>

// 				<div className="flex-1 overflow-hidden">
// 					<form
// 						onSubmit={form.handleSubmit(onSubmit)}
// 						className="flex h-full flex-col"
// 					>
// 						<div className="flex-1 space-y-6 overflow-y-auto pr-2">
// 							<div className="grid gap-1">
// 								<FormWrapper<FormValues>
// 									name="name"
// 									title="Product Category Name"
// 									required
// 									errors={form.formState.errors}
// 								>
// 									<Input
// 										disabled={disabled}
// 										{...form.register("name")}
// 										placeholder="Enter new product category name"
// 										error={!!form.formState.errors.name}
// 										type="text"
// 									/>
// 								</FormWrapper>

// 								<FormWrapper<FormValues>
// 									name="description"
// 									title="Description"
// 									required
// 									errors={form.formState.errors}
// 								>
// 									<Textarea
// 										disabled={disabled}
// 										{...form.register("description")}
// 										placeholder="Enter your description"
// 										error={!!form.formState.errors.description}
// 										rows={3}
// 									/>
// 								</FormWrapper>
// 							</div>
// 						</div>

// 						<SheetFooter className="flex shrink-0 gap-2 border-t pt-4">
// 							<SheetClose asChild>
// 								<Button
// 									variant="outline"
// 									type="button"
// 									onClick={handleCancel}
// 									disabled={isPending || disabled}
// 								>
// 									Cancel
// 								</Button>
// 							</SheetClose>
// 							<Button type="submit" disabled={isPending || disabled}>
// 								{isPending ? (
// 									<div className="flex items-center">
// 										<Loader
// 											className="mr-2 inline-block animate-spin"
// 											size={16}
// 										/>
// 										Updating...
// 									</div>
// 								) : (
// 									"Update Category"
// 								)}
// 							</Button>
// 						</SheetFooter>
// 					</form>
// 				</div>
// 			</SheetContent>
// 		</Sheet>
// 	);
// }
