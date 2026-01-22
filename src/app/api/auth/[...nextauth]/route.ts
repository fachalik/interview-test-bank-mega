import { logger } from "@/lib/logger";
// import { auth } from "@/services";
// import { ResponseGetMe, SignInResponse } from "@/services/auth/types";
import { jwtVerify } from "jose";
import NextAuth, { type NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const secretKey = process.env.NEXTAUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function decrypt(session: string) {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (error) {
		logger.error("Error decrypting token:", error);
		return null;
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) {
					return null;
				}

				try {
					// const authResponse = await auth.SignIn({
					// 	username: credentials.username,
					// 	password: credentials.password,
					// });

					// if (!authResponse?.success) {
					// 	throw new Error("Invalid username or password");
					// }

					// const { access_token, refresh_token } =
					// 	authResponse.data as SignInResponse;

					// const payloadRefresh = await decrypt(refresh_token);
					// const refresh_token_expires = payloadRefresh?.exp;

					// const payloadAccess = await decrypt(access_token);
					// const access_token_expires = payloadAccess?.exp;

					// const profileResponse = await auth.GetProfile({ access_token });
					// const userProfile = profileResponse.data as ResponseGetMe;

					return {
						id: "",
						access_token: "",
						refresh_token: "",
						access_token_expires: null,
						refresh_token_expires: null,
					};
				} catch (error) {
					logger.error("Authorize error:", error);
					throw new Error("Invalid username or password", { cause: error });
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: { token: JWT; user?: User }) {
			// On initial sign in
			if (user) {
				token.access_token = user.access_token;
				token.refresh_token = user.refresh_token;
				token.access_token_expires = user.access_token_expires;
				token.refresh_token_expires = user.refresh_token_expires;
				return token;
			}

			if (Date.now() > (token.access_token_expires ?? 0)) {
				try {
					const response = await fetch(
						`${process.env.NEXTAUTH_URL}/api/v1/security/refresh`,
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ refresh_token: token.refresh_token }),
							cache: "no-store",
						},
					);

					if (response.ok) {
						const data = await response.json();
						token.access_token = data.access_token;
						token.refresh_token = data.refresh_token;

						const payloadAccess = await decrypt(data.access_token);
						token.access_token_expires = payloadAccess?.exp || 0;

						const payloadRefresh = await decrypt(data.refresh_token);
						token.refresh_token_expires = payloadRefresh?.exp || 0;
					} else {
						token.access_token = null;
						token.refresh_token = null;
						token.access_token_expires = null;
						token.refresh_token_expires = null;
					}
				} catch (error) {
					token.access_token = null;
					token.refresh_token = null;
					token.access_token_expires = null;
					token.refresh_token_expires = null;
					logger.error("Error refreshing access token:", error);
				}
			}

			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			// Add tokens to session
			session.access_token = token.access_token;
			session.refresh_token = token.refresh_token;
			return session;
		},
	},
	pages: {
		signIn: "/",
		error: "/signin",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
