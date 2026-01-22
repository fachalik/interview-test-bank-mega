export type ValidationErrorResponse<TInput extends object = object> = {
	detail: Array<{
		type: string;
		loc: string[];
		msg: string;
		input: TInput;
		ctx?: Record<string, unknown>;
	}>;
};

export type SchemaInput = {
	title: string;
	type: "object" | "array" | "string" | "number" | "boolean" | "integer";
	properties?: Record<string, { type: string }>;
	required?: string[];
};

export interface FetchOptions extends Omit<RequestInit, "headers"> {
	requireAuth?: boolean;
	params?: Record<string, string | number | boolean>;
	responseType?: "json" | "text" | "blob" | "arrayBuffer" | "stream";
	headers?: Headers;
	// Add FormData support
	formData?: FormData;
}

export interface APIError {
	[key: string]: string[] | string | number | unknown | object | null; // Each error field maps to an array of strings
}

export interface APIResponse<T> {
	success: boolean;
	data?: T;
	error?: APIError;
	messages?: string;
	status: number;
	headers?: Headers;
	requiresLogout?: boolean; // Add this flag
}
