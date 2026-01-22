"use client";

import { Container } from "@/components/common/container";
import AppHeader from "@/layouts/app-header";

export default function Dashboard() {
	return (
		<div>
			<AppHeader title="Dashboard" />
			<Container className="space-y-2.5"></Container>
		</div>
	);
}
