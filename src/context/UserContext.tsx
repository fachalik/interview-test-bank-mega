"use client";

import { logger } from "@/lib/logger";
import { decrypt } from "@/lib/session";
// import { ResponseGetMe } from "@/services/auth/types";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

// Context value type
interface UserContextType {
	user: unknown | null;
	setUser: (profile: unknown | null) => void;
	organizationId: string | null;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({
	children,
	user,
	token,
}: {
	children: ReactNode;
	user: unknown | null;
	token: string;
}) => {
	const [userState, setUser] = useState<unknown | null>(user);
	const [organizationId, setOrganizationId] = useState<string | null>(null);

	const getOrganizationId = async (token: string) => {
		try {
			const payload = await decrypt(token);

			setOrganizationId(payload.org || null);
		} catch (error) {
			logger.error("Failed to decrypt token:", error);
			return null;
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: getOrganizationId is stable and doesn't need to be in dependencies
	useEffect(() => {
		if (token) {
			getOrganizationId(token);
		}
	}, [token]);

	return (
		<UserContext.Provider value={{ user: userState, setUser, organizationId }}>
			{children}
		</UserContext.Provider>
	);
};

// Custom hook for consuming context
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
