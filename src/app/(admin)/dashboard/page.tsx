import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";

import { db } from "@/db/index";
import { creditsLeadsTable, userTable } from "@/db/schema";
import { DashboardContent } from "@/features/dashboard";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function SupersetDashboardPage() {
	const users = await db.select().from(userTable);
	const leads = await db.select().from(creditsLeadsTable);

	return (
		<Suspense
			fallback={
				<div>
					<Skeleton className="h-12 w-1/3 mb-6" />
					<div className="flex gap-8 mb-8">
						<Skeleton className="h-24 w-48" />
						<Skeleton className="h-24 w-48" />
					</div>
					<Skeleton className="h-8 w-1/2 mb-4" />
					<Skeleton className="h-64 w-full" />
				</div>
			}
		>
			<Container className="space-y-2.5">
				<DashboardContent users={users} leads={leads} />
			</Container>
		</Suspense>
	);
}
