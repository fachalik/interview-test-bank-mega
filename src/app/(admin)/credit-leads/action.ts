"use server";

import { CreditsLeads } from "@/db/schema";
import { logger } from "@/lib/logger";
import {
	createCreditLeads,
	deleteCreditLeads,
	updateCreditLeads,
} from "@/server/creditleads";
import { PrevState } from "@/shared/action-types";
import { revalidatePath } from "next/cache";
import {
	approvedSchema,
	createSchema,
	deleteSchema,
	updateSchema,
} from "./action-validations";

export async function CreateCreditLead(
	prevState: PrevState<CreditsLeads | null>,
	formData: FormData,
): Promise<PrevState<null>> {
	try {
		const rawData = {
			customer_name: formData.get("customer_name") as string,
			amount: Number(formData.get("amount")),
			status: formData.get("status") as string,
			created_by: formData.get("created_by") as string,
		};

		const validatedFields = createSchema.safeParse(rawData);

		if (!validatedFields.success) {
			return {
				message: "Validation failed",
				success: false,
				errors: validatedFields.error.flatten().fieldErrors,
				data: null,
			};
		}

		const { customer_name, amount, status, created_by } = validatedFields.data;

		await createCreditLeads({
			data: {
				customer_name,
				amount: amount.toString(),
				status,
				created_by,
			},
		});

		revalidatePath("/credit-leads");

		return {
			message: "Credit lead created successfully",
			success: true,
			errors: {},
			data: null,
		};
	} catch (error) {
		const messageError: string =
			error instanceof Error ? error.message : "Unknown error";

		return {
			message:
				messageError || "Failed to create credit lead due to server error",
			success: false,
			errors: {},
			data: null,
		};
	}
}

export async function DeleteCreditLeads(
	prevState: PrevState<Response | null>,
	formData: FormData,
): Promise<PrevState<Response | null>> {
	try {
		const validatedFields = deleteSchema.safeParse({
			id: formData.get("id") as string,
		});

		if (!validatedFields.success) {
			return {
				message: "Validation failed",
				success: false,
				errors: validatedFields.error.flatten().fieldErrors,
				data: null,
			};
		}

		const { id } = validatedFields.data;

		const res = await deleteCreditLeads({ id });

		if (!res?.success) {
			return {
				message: res.message ?? "Failed to delete credit lead",
				success: false,
				errors: {},
				data: null,
			};
		}

		revalidatePath("/");

		return {
			message: "Credit lead deleted successfully",
			success: true,
			errors: {},
			data: null,
		};
	} catch (error) {
		logger.error("Error delete credit lead:", error);
		return {
			message: "Failed to delete credit lead due to server error",
			success: false,
			errors: {},
			data: null,
		};
	}
}

export async function UpdateCreditLeads(
	prevState: PrevState<CreditsLeads | null>,
	formData: FormData,
): Promise<PrevState<null>> {
	try {
		const rawData = {
			id: formData.get("id") as string,
			customer_name: formData.get("customer_name") as string,
			amount: Number(formData.get("amount")),
			created_by: formData.get("created_by") as string,
		};

		const validatedFields = updateSchema.safeParse(rawData);

		if (!validatedFields.success) {
			return {
				message: "Validation failed",
				success: false,
				errors: validatedFields.error.flatten().fieldErrors,
				data: null,
			};
		}

		const { id, customer_name, amount, created_by } = validatedFields.data;

		const response = await updateCreditLeads({
			id,
			data: {
				customer_name,
				amount: amount.toString(),
				created_by,
			},
		});

		if (!response?.success) {
			const errorMessage = response.message || "Failed to update credit lead";
			throw new Error(errorMessage);
		}

		revalidatePath("/credit-leads");

		return {
			message: "Credit lead updated successfully",
			success: true,
			errors: {},
			data: null,
		};
	} catch (error) {
		const messageError: string =
			error instanceof Error ? error.message : "Unknown error";

		return {
			message:
				messageError || "Failed to update credit lead due to server error",
			success: false,
			errors: {},
			data: null,
		};
	}
}

export async function ApproveCreditLeads(
	prevState: PrevState<CreditsLeads | null>,
	formData: FormData,
): Promise<PrevState<null>> {
	try {
		const rawData = {
			id: formData.get("id") as string,
			approved_by: formData.get("approved_by") as string,
		};

		const validatedFields = approvedSchema.safeParse(rawData);
		if (!validatedFields.success) {
			return {
				message: "Validation failed",
				success: false,
				errors: validatedFields.error.flatten().fieldErrors,
				data: null,
			};
		}

		const { id, approved_by } = validatedFields.data;

		const response = await updateCreditLeads({
			id,
			data: {
				approved_by,
				status: "approved",
			},
		});

		if (!response?.success) {
			const errorMessage = response.message || "Failed to approve credit lead";
			throw new Error(errorMessage);
		}

		revalidatePath("/credit-leads");

		return {
			message: "Credit lead approved successfully",
			success: true,
			errors: {},
			data: null,
		};
	} catch (error) {
		const messageError: string =
			error instanceof Error ? error.message : "Unknown error";

		return {
			message:
				messageError || "Failed to approve credit lead due to server error",
			success: false,
			errors: {},
			data: null,
		};
	}
}
