"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
// import { signOut } from "next-auth/react";
import {
	APIError,
	APIResponse,
	FetchOptions,
	SchemaInput,
	ValidationErrorResponse,
} from "./types";

// Define APIError type if not already imported]

import { logger } from "@/lib/logger";
import { redirect } from "next/navigation";

const API_URL = process.env.BACKEND_URL || "https://your-api.com";

/**
 * A unified fetch wrapper for Next.js with token + refreshToken support.
 * Works both server-side (App Router) and client-side.
 */
export async function request<T>(
	endpoint: string,
	options: FetchOptions = {},
): Promise<APIResponse<T>> {
	const {
		requireAuth = true,
		headers,
		params,
		responseType = "json",
		formData,
		...rest
	} = options;

	// Build URL with query parameters
	let url = `${API_URL}${endpoint}`;
	if (params && Object.keys(params).length > 0) {
		const searchParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			searchParams.append(key, String(value));
		});
		url += `?${searchParams.toString()}`;
	}

	// Get session from NextAuth
	const session = await getServerSession(authOptions);
	const access_token = session?.access_token as string | undefined;
	const refresh_token = session?.refresh_token as string | undefined;

	// Build headers
	const reqHeaders = new Headers(headers);

	// Only set Content-Type for JSON, let browser set it for FormData
	if (!formData) {
		reqHeaders.set("Content-Type", "application/json");
	}

	if (requireAuth && access_token) {
		reqHeaders.set("Authorization", `Bearer ${access_token}`);
	}

	// Prepare request body
	let body: string | FormData | undefined;
	if (formData) {
		body = formData;
	} else if (rest.body) {
		body = rest.body as string | FormData;
	}

	// Send initial request
	let res = await fetch(url, {
		...rest,
		headers: reqHeaders,
		body,
		cache: "no-store",
	});

	// Handle expired token → try refresh
	if ((res.status === 401 || res.status === 403) && refresh_token) {
		const newToken = await refreshAccessToken(refresh_token);
		logger.log("Refreshed token:", newToken);

		if (newToken) {
			// Update headers with new token
			reqHeaders.set("Authorization", `Bearer ${newToken}`);

			// Retry the original request
			res = await fetch(url, {
				...rest,
				headers: reqHeaders,
				body,
				cache: "no-store",
			});
		}

		if (newToken === null || !newToken) {
			redirect("/signout");
		}
	}

	if ((res.status === 401 || res.status === 403) && !refresh_token) {
		redirect("/signout");
	}

	if (!res.ok) {
		let mapData: Record<string, string[]> = {};
		let errorMessage = `Request failed with status ${res.status}`;
		let errorDetail: unknown = null;

		const contentType = res.headers.get("content-type") || "";

		if (contentType.includes("application/json")) {
			const json: ValidationErrorResponse<SchemaInput> = await res.json();
			if (json.detail) {
				if (Array.isArray(json.detail)) {
					json.detail.forEach(
						(item: ValidationErrorResponse["detail"][number]) => {
							const field = Array.isArray(item.loc)
								? item.loc[item.loc.length - 1]
								: "non_field_error";
							if (!mapData[field]) {
								mapData[field] = [];
							}
							mapData[field].push(item.msg);
						},
					);
				} else {
					mapData = { non_field_error: [json.detail] };
				}
			}
			errorDetail = mapData;
		} else {
			// Not JSON, get text
			const text = await res.text();
			mapData = { non_field_error: [text] };
			errorMessage = text;
			errorDetail = mapData;
		}

		return {
			success: false,
			error: errorDetail as APIError,
			messages: errorMessage,
			status: res.status,
			headers: res.headers,
		};
	}

	try {
		let data: T;

		const isResponseEmpty = async () => {
			const text = await res.clone().text();
			return !text || text.trim() === "";
		};

		switch (responseType) {
			case "text":
				data = (await res.text()) as T;
				break;
			case "blob":
				data = (await res.blob()) as T;
				break;
			case "arrayBuffer":
				data = (await res.arrayBuffer()) as T;
				break;
			case "stream":
				data = res.body as T;
				break;
			case "json":
				if (await isResponseEmpty()) {
					data = {} as T; // or `null` if you prefer
				} else {
					data = (await res.json()) as T;
				}
				break;
			default:
				if (await isResponseEmpty()) {
					data = {} as T;
				} else {
					data = await res.json();
				}
				break;
		}

		return {
			success: true,
			data,
			status: res.status,
			headers: res.headers,
		};
	} catch (error) {
		logger.error("Failed to parse response:", error);
		return {
			success: false,
			error: error as APIError,
			messages: `Failed to parse response as ${responseType}`,
			status: res.status,
			headers: res.headers,
		};
	}
}

/**
 * Helper function to read from a ReadableStream
 * Usage example for streaming data processing
 */
export async function* readStream(stream: ReadableStream<Uint8Array>) {
	const reader = stream.getReader();
	const decoder = new TextDecoder();

	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value, { stream: true });
			yield chunk;
		}
	} finally {
		reader.releaseLock();
	}
}

/**
 * Helper function to read JSON lines from a stream
 * Useful for Server-Sent Events or JSON streaming
 */
export async function* readJSONStream<T>(stream: ReadableStream<Uint8Array>) {
	let buffer = "";

	for await (const chunk of readStream(stream)) {
		buffer += chunk;
		const lines = buffer.split("\n");
		buffer = lines.pop() || "";

		for (const line of lines) {
			const trimmed = line.trim();
			if (trimmed) {
				try {
					// Handle SSE format
					if (trimmed.startsWith("data: ")) {
						const jsonStr = trimmed.slice(6);
						if (jsonStr !== "[DONE]") {
							yield JSON.parse(jsonStr) as T;
						}
					} else {
						yield JSON.parse(trimmed) as T;
					}
				} catch (error) {
					logger.warn("Failed to parse JSON line:", trimmed, error);
				}
			}
		}
	}

	// Process remaining buffer
	if (buffer.trim()) {
		try {
			yield JSON.parse(buffer.trim()) as T;
		} catch (error) {
			logger.warn("Failed to parse final JSON:", buffer, error);
		}
	}
}

async function refreshAccessToken(
	refresh_token: string,
): Promise<string | null> {
	try {
		const res = await fetch(`${API_URL}/api/v1/security/refresh`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refresh_token: refresh_token }),
			cache: "no-store",
		});

		if (!res.ok) return null;
		const data = await res.json();
		return data.access_token;
	} catch {
		logger.error("Failed to refresh token");
		return null;
	}
}
