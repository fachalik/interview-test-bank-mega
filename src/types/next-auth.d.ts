import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface User {
		access_token?: string | null;
		refresh_token?: string | null;
		access_token_expires: number | null;
		refresh_token_expires: number | null;
	}

	interface Session {
		access_token?: string | null;
		refresh_token?: string | null;
		access_token_expires: number | null;
		refresh_token_expires: number | null;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		access_token?: string | null;
		refresh_token?: string | null;
		access_token_expires: number | null;
		refresh_token_expires: number | null;
	}
}
