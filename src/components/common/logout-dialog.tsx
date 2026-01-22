"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { logger } from "@/lib/logger";
import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";

interface LogoutDialogProps {
	open: boolean;
	onClose: () => void;
	onSuccess?: () => void;
}

export function LogoutDialog({ open, onClose, onSuccess }: LogoutDialogProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleLogout = useCallback(async () => {
		try {
			setIsLoading(true);
			await signOut({ redirect: false, callbackUrl: "/" });
			onSuccess?.();
			window.location.href = "/";
		} catch (error) {
			logger.error("Logout failed:", error);
		} finally {
			setIsLoading(false);
			onClose();
		}
	}, [onClose, onSuccess]);

	const handleOpenChange = useCallback(
		(isOpen: boolean) => {
			if (!isLoading) {
				onClose();
			}
		},
		[isLoading, onClose],
	);

	return (
		<AlertDialog open={open} onOpenChange={handleOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirm Logout</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to logout? You&apos;ll need to sign in again
						to access your account.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleLogout}
						disabled={isLoading}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{isLoading ? "Logging out..." : "Logout"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
