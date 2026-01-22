"use client";

import { UpdateCreditLeads } from "@/app/(admin)/credit-leads/action";
import { useUser } from "@/context/UserContext";
import { CreditsLeads } from "@/db/schema";

import { PrevState } from "@/shared/action-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { startTransition, useActionState, useEffect } from "react";
import { useForm as useFormRHF } from "react-hook-form";
import * as yup from "yup";
import { Data } from "..";

export const schema = yup.object().shape({
	customer_name: yup.string().required("Customer name is required"),
	amount: yup.string().required("Amount is required"),
});

export interface FormValues extends yup.InferType<typeof schema> {}

interface UseFormProps {
	onSuccess?: () => void;
	onError?: (error: string) => void;
	data?: Data | null;
}

export const useForm = ({ onSuccess, onError, data }: UseFormProps) => {
	const { user } = useUser();
	const [state, formAction, isPending] = useActionState<
		PrevState<CreditsLeads | null>,
		FormData
	>(UpdateCreditLeads, {
		message: "",
		errors: {},
		success: false,
		data: null,
	});

	const form = useFormRHF<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			customer_name: data?.customer_name || "",
			amount: data?.amount || "",
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: form.reset and callbacks are stable references
	useEffect(() => {
		if (state.success) {
			onSuccess?.();
			form.reset();
		} else if (state.message) {
			console.log("Setting form errors", state.errors);
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

	const onSubmit = (payload: FormValues) => {
		const formData = new FormData();

		Object.entries(payload).forEach(([key, value]) => {
			formData.append(key, String(value));
		});

		formData.append("id", String(data?.id ?? ""));
		formData.append("created_by", String(user?.id ?? ""));

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
