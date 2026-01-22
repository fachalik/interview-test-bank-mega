"use server";

import { db } from "@/db/index";
import { creditsLeadsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createCreditLeads({
	data,
}: {
	data: typeof creditsLeadsTable.$inferInsert;
}) {
	try {
		const response = await db.insert(creditsLeadsTable).values(data);

		return {
			message: "Credit lead created successfully",
			data,
			success: true,
			response,
		};
	} catch (error) {
		return {
			message: "Failed to create credit lead",
			data,
			success: false,
			response: error,
		};
	}
}

export async function deleteCreditLeads({ id }: { id: string }) {
	try {
		const response = await db
			.delete(creditsLeadsTable)
			.where(eq(creditsLeadsTable.id, id));

		return {
			message: "Credit lead deleted successfully",
			success: true,
			response,
		};
	} catch (error) {
		return {
			message: "Failed to delete credit lead",
			success: false,
			response: error,
		};
	}
}

export async function updateCreditLeads({
	id,
	data,
}: {
	id: string;
	data: Partial<typeof creditsLeadsTable.$inferInsert>;
}) {
	try {
		const response = await db
			.update(creditsLeadsTable)
			.set(data)
			.where(eq(creditsLeadsTable.id, id));

		return {
			message: "Credit lead updated successfully",
			response,
			success: true,
		};
	} catch (error) {
		return {
			message: "Failed to update credit lead",
			success: false,
			response: error,
		};
	}
}
