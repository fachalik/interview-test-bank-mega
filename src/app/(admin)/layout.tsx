"use server";

import { UserProvider } from "@/context/UserContext";
import DashboardLayout from "@/layouts";
// import { GetProfile } from "@/services/auth";
import { User } from "@/db/schema";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Fetch user profile using the access token from the session
	const session = await getServerSession(authOptions);

	const user = session?.user;

	console.log("AdminLayout - Current User:", user, session);

	return (
		<UserProvider user={user}>
			<DashboardLayout>{children}</DashboardLayout>
		</UserProvider>
	);
}
