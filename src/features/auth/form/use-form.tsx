"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm as useFormRHF } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

export const schema = yup.object({
	username: yup.string().min(4).required("Username is required"),
	password: yup.string().min(6).required("Password is required"),
});

export interface FormValues extends Record<string, unknown> {
	username: string;
	password: string;
}

export const useForm = () => {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);

	const form = useFormRHF<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (data: FormValues) => {
		setIsPending(true);

		try {
			const result = await signIn("credentials", {
				username: data.username,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				form.setError("root", {
					type: "manual",
					message: result.error,
				});
			} else if (result?.ok) {
				toast.success("Logged in successfully", { duration: 2000 });
				router.push("/dashboard");
				form.reset();
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An error occurred";
			form.setError("root", {
				type: "manual",
				message: errorMessage,
			});
		} finally {
			setIsPending(false);
		}
	};

	const reset = () => {
		form.reset();
	};

	return {
		form,
		onSubmit,
		isPending,
		reset,
	};
};
