import { AnyColumn } from "drizzle-orm";

export type SortMap = Record<string, AnyColumn>;

export type SortOrder = "asc" | "desc";

export type PaginationParams = {
	page?: number;
	pageSize?: number;
};

export type PrevState<T> = {
	message: string;
	success: boolean;
	errors: Record<string, string[]> | unknown;
	data: T;
};
