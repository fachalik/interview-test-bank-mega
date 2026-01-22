"use server";

// import type { ResponseGetMe } from "@/services/auth/types";
import jwt from "jsonwebtoken";
import { logger } from "./logger";

const secretKey = process.env.NEXTAUTH_SECRET;

if (!secretKey) {
	logger.error(
		"[Session][Error] NEXTAUTH_SECRET is undefined. JWT operations will fail.",
	);
}

export interface SessionPayload {
	access_token: string;
	refresh_token: string;
	userData: undefined | null; // ResponseGetMe | null;
}

export interface UpdateSessionPayload {
	access_token?: string;
	refresh_token?: string;
	userData?: Partial<undefined | null>; // Partial<ResponseGetMe>;
}

export interface ITokenDecodeResponse {
	sub: string;
	org: string;
	exp: number;
}

export async function decrypt(session: string) {
	try {
		const payload = jwt.verify(session, secretKey as string, {
			algorithms: ["HS256"],
		});
		return payload as ITokenDecodeResponse;
	} catch (error) {
		logger.error("JWT verification failed", error);
		throw error;
	}
}
