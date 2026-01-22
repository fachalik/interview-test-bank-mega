"use client";

import { useTheme } from "@/context/ThemeContext";
import { ProgressProvider } from "@bprogress/next/app";

const BProgressProviders = ({ children }: { children: React.ReactNode }) => {
	const { theme } = useTheme();
	return (
		<ProgressProvider
			height="4px"
			color={theme === "dark" ? "#ffffff" : "#399"}
			options={{ showSpinner: false }}
			shallowRouting
		>
			{children}
		</ProgressProvider>
	);
};

export default BProgressProviders;
