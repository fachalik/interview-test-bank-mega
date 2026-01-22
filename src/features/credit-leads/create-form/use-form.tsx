"use client";

import { CreateCreditLead } from "@/app/(admin)/credit-leads/action";
import { useUser } from "@/context/UserContext";
import { CreditsLeads, creditsLeadsTable } from "@/db/schema";
import { PrevState } from "@/shared/action-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { startTransition, useActionState, useEffect } from "react";
import { useForm as useFormRHF } from "react-hook-form";
import * as yup from "yup";

export const schema = yup.object().shape({
	customer_name: yup.string().required("Customer name is required"),
	amount: yup.string().required("Amount is required"),
});

export interface FormValues extends yup.InferType<typeof schema> {}

interface UseFormProps {
	onSuccess?: () => void;
	onError?: (error: string) => void;
}

export const useForm = ({ onSuccess, onError }: UseFormProps) => {
	const { user } = useUser();
	const [state, formAction, isPending] = useActionState<
		PrevState<CreditsLeads | null>,
		FormData
	>(CreateCreditLead, {
		message: "",
		errors: {},
		success: false,
		data: null,
	});

	const form = useFormRHF<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			customer_name: "",
			amount: "",
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: form.reset and callbacks are stable references
	useEffect(() => {
		if (state.success) {
			onSuccess?.();
			form.reset();
		} else if (state.message) {
			if (state.errors) {
				Object.entries(state.errors).forEach(([field, messages]) =>
					form.setError(field as keyof FormValues | `root.${string}` | "root", {
						type: "manual",
						message: messages?.[0] || "Invalid input",
					}),
				);
			}
			onError?.(state.message);
		}
	}, [state]);

	const onSubmit = (data: FormValues) => {
		const payload: typeof creditsLeadsTable.$inferInsert = {
			customer_name: data.customer_name,
			amount: data.amount,
			status: "pending",
			created_by: user?.id || "",
		};

		const formData = new FormData();

		Object.entries(payload).forEach(([key, value]) => {
			formData.append(key, String(value));
		});

		startTransition(() => {
			formAction(formData);
		});
	};

	const reset = () => {
		form.reset();
	};

	return {
		form,
		onSubmit,
		state,
		isPending,
		reset,
	};
};
