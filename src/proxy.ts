import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		const { pathname } = req.nextUrl;
		const token = req.nextauth.token;

		const access_token = token?.access_token as string | undefined;
		const refresh_token = token?.refresh_token as string | undefined;
		const isAuthenticated = !!(access_token || refresh_token);

		// Redirect authenticated users away from public pages
		if (isAuthenticated) {
			if (pathname === "/" || pathname === "/signin") {
				return NextResponse.redirect(new URL("/dashboard", req.url));
			}
			return NextResponse.next();
		}

		// Allow unauthenticated access to public routes
		if (publicRoute(pathname)) {
			return NextResponse.next();
		}

		// Redirect unauthenticated users to signin for protected routes
		return NextResponse.redirect(new URL("/signin", req.url));
	},
	{
		callbacks: {
			// This MUST return true to let your middleware handle auth logic
			authorized: () => true,
		},
	},
);

const publicPaths = ["/", "/signin", "/signup", "/forgot-password"];

function publicRoute(pathname: string) {
	return publicPaths.some((path) => pathname === path);
}

export const config = {
	matcher: ["/", "/signin", "/signup", "/forgot-password", "/app/:path*"],
};
