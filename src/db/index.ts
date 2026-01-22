import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle(process.env.DATABASE_URL!);

async function main() {
	// const adminUser: typeof userTable.$inferInsert = {
	// 	name: "Admin User",
	// 	email: "admin@gmail.com",
	// 	role: "admin",
	// 	password_hash: bcrypt.hashSync("admin123", 10),
	// 	username: "admin",
	// };
	// const approvalUser1: typeof userTable.$inferInsert = {
	// 	name: "Approval User 1",
	// 	email: "approver1@gmail.com",
	// 	role: "approver",
	// 	password_hash: bcrypt.hashSync("approver123", 10),
	// 	username: "approver1",
	// };
	// const approvalUser2: typeof userTable.$inferInsert = {
	// 	name: "Approval User 2",
	// 	email: "approver2@gmail.com",
	// 	role: "approver",
	// 	password_hash: bcrypt.hashSync("approver123", 10),
	// 	username: "approver2",
	// };
	// const user1: typeof userTable.$inferInsert = {
	// 	name: "Regular User 1",
	// 	email: "user1@gmail.com",
	// 	role: "user",
	// 	password_hash: bcrypt.hashSync("user123", 10),
	// 	username: "user1",
	// };
	// const user2: typeof userTable.$inferInsert = {
	// 	name: "Regular User 2",
	// 	email: "user2@gmail.com",
	// 	role: "user",
	// 	password_hash: bcrypt.hashSync("user123", 10),
	// 	username: "user2",
	// };
	// await db
	// 	.insert(userTable)
	// 	.values([adminUser, approvalUser1, approvalUser2, user1, user2]);
	// console.log("Admin and Approval users created!");
}

main();
