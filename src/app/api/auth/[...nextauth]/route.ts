import { db } from "@/db/index";
import { userTable } from "@/db/schema";
import { logger } from "@/lib/logger";
import bcrypyt from "bcrypt";
import { and, eq } from "drizzle-orm";
import NextAuth, { type NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				if (!credentials?.username || !credentials?.password) {
					return null;
				}

				try {
					const user = await db
						.select()
						.from(userTable)
						.where(and(eq(userTable.username, credentials.username)))
						.limit(1);

					const userData = user[0] ?? null;

					console.log("User data found:", userData);

					if (!userData) {
						throw new Error("Invalid username or password");
					}

					const isPasswordValid = await bcrypyt.compare(
						credentials.password,
						userData.password_hash,
					);

					if (!isPasswordValid) {
						throw new Error("Invalid username or password");
					}

					// Add required fields for NextAuth User type
					return userData;
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
				token = user as JWT;

				return token;
			}

			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			// Add tokens to session
			// (session.user as Session) = token;
			if (session) {
				// Copy relevant properties from token to session.user if needed
				session.user = {
					...session.user,
					...(token && typeof token === "object"
						? {
								id: token.id,
								username: token.username,
								name: token.name,
								email: token.email,
								role: token.role,
								created_at: token.created_at,
							}
						: {}),
				};

				return session;
			}

			return session;
		},
	},
	pages: {
		signIn: "/",
		error: "/",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
