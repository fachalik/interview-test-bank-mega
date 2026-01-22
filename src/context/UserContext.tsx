"use client";

import { User } from "@/db/schema";
import { createContext, ReactNode, useContext, useState } from "react";

// Context value type
interface UserContextType {
	user: User | null;
	setUser: (profile: User | null) => void;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({
	children,
	user,
}: {
	children: ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: false positive
	user: any | null;
}) => {
	const [userState, setUser] = useState<User | null>(user);

	return (
		<UserContext.Provider value={{ user: userState, setUser }}>
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
