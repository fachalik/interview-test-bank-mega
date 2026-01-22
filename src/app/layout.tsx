import { Plus_Jakarta_Sans } from "next/font/google";
import "remixicon/fonts/remixicon.css";
import "./globals.css";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import BProgressProviders from "@/providers/b-progress-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { SessionProviders } from "@/providers/session-provider";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

const outfit = Plus_Jakarta_Sans({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Bank Mega Interview Test",
	manifest: "/manifest.json",
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
		other: [
			{ rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" },
			{ rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" },
		],
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<body className={`${outfit.className} dark:bg-gray-900`}>
				<ReactQueryProvider>
					<SessionProviders session={session}>
						<ThemeProvider>
							<BProgressProviders>
								<SidebarProvider>{children}</SidebarProvider>
								<Toaster position="top-center" />
							</BProgressProviders>
						</ThemeProvider>
					</SessionProviders>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
