import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoaderPage from "@/components/common/loader";
import { db } from "@/db/index";
import { creditsLeadsTable, userTable } from "@/db/schema";
import CreditLeads from "@/features/credit-leads";
import { getPagination } from "@/lib/pagination";
import { aliasedTable, and, eq, like, sql } from "drizzle-orm";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

// Extend the Session type to include 'id' on user
declare module "next-auth" {
	interface Session {
		user?: {
			id?: string | number;
			role?: string | null;
			name?: string | null;
			email?: string | null;
			image?: string | null;
		};
	}
}

export const metadata: Metadata = {
	title: "Credit Leads",
};

interface Props {
	searchParams: Promise<{
		page?: number;
		size?: number;
		search?: string;
	}>;
}

export default async function SupersetDashboardPage({ searchParams }: Props) {
	const params = await searchParams;
	const session = await getServerSession(authOptions);

	if (!session) {
		throw new Error("User session not found. Please log in.");
	}

	// console.log("session", session.user?.id);

	const userId = session.user?.id ?? null;
	const role = session.user?.role ?? null;

	const page = Number(params.page) || 1;
	const size = Number(params.size) || 10;
	const search = params.search;

	const { limit, offset } = getPagination({ page, pageSize: size });

	const filters = [];
	if (userId && role === "user") {
		filters.push(eq(creditsLeadsTable.created_by, userId.toString()));
	}
	if (search) {
		filters.push(like(creditsLeadsTable.customer_name, `%${search}%`));
	}

	const createdByUser = aliasedTable(userTable, "created_by_user");
	const approvedByUser = aliasedTable(userTable, "approved_by_user");

	const selectData = db
		.select({
			id: creditsLeadsTable.id,
			customer_name: creditsLeadsTable.customer_name,
			amount: creditsLeadsTable.amount,
			status: creditsLeadsTable.status,
			created_at: creditsLeadsTable.created_at,
			createdBy: {
				id: createdByUser.id,
				username: createdByUser.username,
				name: createdByUser.name,
				email: createdByUser.email,
			},
			approvedBy: {
				id: approvedByUser.id,
				username: approvedByUser.username,
				name: approvedByUser.name,
				email: approvedByUser.email,
			},
		})
		.from(creditsLeadsTable)
		.leftJoin(createdByUser, eq(creditsLeadsTable.created_by, createdByUser.id))
		.leftJoin(
			approvedByUser,
			eq(creditsLeadsTable.approved_by, approvedByUser.id),
		)
		.where(and(...filters))
		.limit(limit)
		.offset(offset);

	console.log(selectData.toSQL());

	const [data, [{ total }]] = await Promise.all([
		selectData,
		db
			.select({ total: sql<number>`count(*)` })
			.from(creditsLeadsTable)
			.where(and(...filters)),
	]);

	console.log("Credit Leads data:", data);

	return (
		<Suspense fallback={<LoaderPage />}>
			<CreditLeads
				data={data}
				page={page}
				pageSize={size}
				totalData={total}
				totalPages={Math.ceil(total / size)}
				searchParams={{ search }}
			/>
		</Suspense>
	);
}
