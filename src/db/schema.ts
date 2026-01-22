import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
	date,
	index,
	mysqlEnum,
	mysqlTable,
	uniqueIndex,
	varchar,
} from "drizzle-orm/mysql-core";

export const roleEnum = mysqlEnum("role", ["approver", "user", "admin"]);

export enum RoleType {
	approver = "approver",
	user = "user",
	admin = "admin",
}
// export type RoleType = typeof roleEnum.$type;

export const userTable = mysqlTable(
	"user",
	{
		id: varchar({ length: 128 })
			.$defaultFn(() => createId())
			.primaryKey(),
		username: varchar("username", { length: 50 }).notNull(),
		name: varchar("name", { length: 150 }).notNull(),
		email: varchar("email", { length: 255 }).notNull(),
		password_hash: varchar("password_hash", { length: 255 }).notNull(),
		role: roleEnum.notNull(),
		created_at: date("created_at")
			.$defaultFn(() => new Date())
			.notNull(),
	},
	(table) => ({
		usernameUnique: uniqueIndex("uq_user_username").on(table.username),
		roleIdx: index("idx_user_role").on(table.role),
	}),
);

export type User = Omit<typeof userTable.$inferSelect, "password_hash">;

export const creditsLeadsTable = mysqlTable(
	"credits_leads",
	{
		id: varchar({ length: 128 })
			.$defaultFn(() => createId())
			.primaryKey(),
		customer_name: varchar("customer_name", { length: 150 }).notNull(),
		amount: varchar("amount", { length: 50 }).notNull(),
		status: varchar("status", { length: 30 }).notNull(), // e.g. 'pending', 'approved', 'rejected'
		created_by: varchar("created_by", { length: 128 }).notNull(), // FK to userTable.id
		approved_by: varchar("approved_by", { length: 128 }), // FK to userTable.id, nullable
		created_at: date("created_at").$defaultFn(() => new Date()).notNull(),
		approved_at: date("approved_at"),
	},
	(table) => ({
		createdByIdx: index("idx_credits_leads_created_by").on(table.created_by),
		approvedByIdx: index("idx_credits_leads_approved_by").on(table.approved_by),
	}),
);

export type CreditsLeads = typeof creditsLeadsTable.$inferSelect;

export const userRelations = relations(userTable, ({ many }) => ({
	createdCreditsLeads: many(creditsLeadsTable, {
		relationName: "created_by",
	}),
	approvedCreditsLeads: many(creditsLeadsTable, {
		relationName: "approved_by",
	}),
}));

export const creditsLeadsRelations = relations(
	creditsLeadsTable,
	({ one }) => ({
		createdBy: one(userTable, {
			fields: [creditsLeadsTable.created_by],
			references: [userTable.id],
			relationName: "created_by",
		}),
		approvedBy: one(userTable, {
			fields: [creditsLeadsTable.approved_by],
			references: [userTable.id],
			relationName: "approved_by",
		}),
	}),
);
