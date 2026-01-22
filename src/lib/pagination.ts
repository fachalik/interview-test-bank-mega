import { PaginationParams } from "@/shared/types";
import { SQL, sql } from "drizzle-orm";

export function getPagination({ page = 1, pageSize = 10 }: PaginationParams) {
  const limit = Math.min(Math.max(pageSize, 1), 100);
  const offset = (Math.max(page, 1) - 1) * limit;

  return {
    page,
    pageSize: limit,
    limit,
    offset,
  };
}

export function withTotal<T extends SQL>(totalQuery: T) {
  return sql<{ total: number }>`(${totalQuery})`;
}
