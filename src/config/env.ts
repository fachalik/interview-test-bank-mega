// src/config/env.ts
import z from "zod";

const envSchema = z.object({
	PORT: z.string().default("3000"),
	NEXTAUTH_SECRET: z.string().min(32),
	DATABASE_URL: z.string().min(1),
});

// Function to validate the environment variables
export const validateEnv = () => envSchema.safeParse(process.env);

// Extend ProcessEnv interface with environment variables schema
declare global {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface ProcessEnv extends z.infer<typeof envSchema> {}
}
