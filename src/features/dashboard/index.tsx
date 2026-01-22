"use client";

import { Table } from "@/components/common/table";
import { Card } from "@/components/ui/card";
import { CreditsLeads, User } from "@/db/schema";
import { getColumns } from "./columns";
import CardItem from "./components/card-items";

export function DashboardContent({
	users,
	leads,
}: {
	users: User[];
	leads: CreditsLeads[];
}) {
	const columns = getColumns();
	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Dashboard</h1>
			<div className="space-y-2.5">
				<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-2.5">
					<CardItem
						key={"total-users"}
						title={"Total Users"}
						value={users.length}
						className="cols"
					/>
					<CardItem
						key={"total"}
						title={"Total Credit Leads"}
						value={leads.length}
					/>
					<CardItem
						key={"total-pending"}
						title={"Pending Credit Leads"}
						value={leads.filter((l) => l.status === "pending").length}
					/>
					<CardItem
						key={"total-approved"}
						title={"Approved Credit Leads"}
						value={leads.filter((l) => l.status === "approved").length}
					/>
					<CardItem
						key={"total-rejected"}
						title={"Rejected Credit Leads"}
						value={leads.filter((l) => l.status === "rejected").length}
					/>
				</div>
				<Card className="p-2.5">
					<h2 className="text-2xl font-semibold mb-4">Latest Credit Leads</h2>
					<Table<CreditsLeads>
						data={leads}
						columns={columns}
						getRowId={(row) => row.id}
					/>
				</Card>
			</div>
		</div>
	);
}
