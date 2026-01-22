import { z } from "zod";

export const deleteSchema = z.object({
	id: z.string().min(1, " ID is required"),
});

export type DeleteCreditsLead = z.infer<typeof deleteSchema>;

export const createSchema = z.object({
	customer_name: z.string().min(1, "Customer name is required"),
	amount: z.number(),
	status: z.string().min(1, "Status is required"),
	created_by: z.string().min(1, "Created by is required"),
});

export type CreateCategory = z.infer<typeof createSchema>;

export const updateSchema = createSchema
	.extend({
		id: z.string().min(1, "ID is required"),
	})
	.omit({ status: true });

export type UpdateCategory = z.infer<typeof updateSchema>;

export const approvedSchema = z.object({
	id: z.string().min(1, " ID is required"),
	approved_by: z.string().min(1, "Approved by is required"),
});
