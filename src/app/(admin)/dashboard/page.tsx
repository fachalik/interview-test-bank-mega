import LoaderPage from "@/components/common/loader";
import Dashboard from "@/features/dashboard";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function SupersetDashboardPage() {
	return (
		<Suspense fallback={<LoaderPage />}>
			<Dashboard />
		</Suspense>
	);
}
