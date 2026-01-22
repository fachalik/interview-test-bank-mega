"use server";

import { UserProvider } from "@/context/UserContext";
import DashboardLayout from "@/layouts";
// import { GetProfile } from "@/services/auth";
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
	// const response = await GetProfile({
	// 	access_token: session?.access_token ?? "",
	// });
	const userProfile = null;

	return (
		<UserProvider user={userProfile} token={session?.access_token ?? ""}>
			<DashboardLayout>{children}</DashboardLayout>
		</UserProvider>
	);
}
