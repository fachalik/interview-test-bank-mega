"use client";

import { Spinner } from "@/components/ui/spinner"; // Make sure this path matches your project
import { logger } from "@/lib/logger";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

export default function SignOut() {
	const { status } = useSession();

	const logout = useCallback(async () => {
		try {
			await signOut({ redirect: false, callbackUrl: "/" });
			window.location.href = "/";
		} catch (error) {
			logger.error("Logout failed:", error);
		}
	}, []);

	const navigate = () => {
		window.location.replace("/");
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: navigate and logout are defined in useCallback
	useEffect(() => {
		if (status === "unauthenticated") {
			navigate();
		}

		if (status === "authenticated") {
			logout();
		}
	}, [status]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
				<Spinner className="mb-6 w-10 h-10 text-primary" />
				<h2 className="text-xl font-semibold mb-2">Signing you out</h2>
				<p className="text-muted-foreground text-center">
					Please wait while we securely log you out.
				</p>
			</div>
		</div>
	);
}
