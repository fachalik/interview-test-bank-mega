// "use client";

// // import { CreateCategory } from "@/app/(admin)/settings/categorys/actions";
// // import type {
// // 	ProductCategory,
// // 	PayloadCreateProductCategory,
// // } from "@/services/product-category/types";
// import { PrevState } from "@/shared/action-types";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { startTransition, useActionState, useEffect } from "react";
// import { useForm as useFormRHF } from "react-hook-form";
// import * as yup from "yup";

// export const schema = yup.object().shape({
// 	name: yup.string().required("Name is required"),
// 	description: yup.string().optional().default(""),
// });

// export type FormValues = {
// 	name: string;
// 	description: string;
// };

// interface UseFormProps {
// 	onSuccess?: () => void;
// 	onError?: (error: string) => void;
// }

// export const useForm = ({ onSuccess, onError }: UseFormProps) => {
// 	const [state, formAction, isPending] = useActionState<
// 		PrevState<unknown | null>,
// 		FormData
// 	>(CreateCategory, {
// 		message: "",
// 		errors: {},
// 		success: false,
// 		data: null,
// 	});

// 	const form = useFormRHF<FormValues>({
// 		resolver: yupResolver(schema),
// 		defaultValues: {
// 			name: "",
// 			description: "",
// 		},
// 	});

// 	// biome-ignore lint/correctness/useExhaustiveDependencies: form.reset and callbacks are stable references
// 	useEffect(() => {
// 		if (state.success) {
// 			onSuccess?.();
// 			form.reset();
// 		} else if (state.message) {
// 			if (state.errors) {
// 				Object.entries(state.errors).forEach(([field, messages]) =>
// 					form.setError(field as keyof FormValues | `root.${string}` | "root", {
// 						type: "manual",
// 						message: messages?.[0] || "Invalid input",
// 					}),
// 				);
// 			}
// 			onError?.(state.message);
// 		}
// 	}, [state]);

// 	const onSubmit = (data: FormValues) => {
// 		const payload: PayloadCreateProductCategory = {
// 			name: data.name,
// 			description: data.description ?? "",
// 		};

// 		const formData = new FormData();

// 		Object.entries(payload).forEach(([key, value]) => {
// 			formData.append(key, String(value));
// 		});

// 		startTransition(() => {
// 			formAction(formData);
// 		});
// 	};

// 	const reset = () => {
// 		form.reset();
// 	};

// 	return {
// 		form,
// 		onSubmit,
// 		state,
// 		isPending,
// 		reset,
// 	};
// };
