"use server";

import { db } from "@/db/index";
import { userTable } from "@/db/schema";

export async function createUser({
	data,
}: {
	data: typeof userTable.$inferInsert;
}) {
	const user = await db.insert(userTable).values(data);

	return user;
}
