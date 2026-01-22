import { userTable } from "@/db/schema";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface User extends Partial<typeof userTable.$inferSelect> {}

	interface Session extends Partial<typeof userTable.$inferSelect> {}
}

declare module "next-auth/jwt" {
	interface JWT extends Partial<typeof userTable.$inferSelect> {}
}
