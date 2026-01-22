import { asc, desc, AnyColumn } from "drizzle-orm";

type SortMap<T> = Record<string, AnyColumn>;

export function parseSort<T extends SortMap<T>>(
  sort: string | undefined,
  columns: T
) {
  if (!sort) return [];

  return sort
    .split(";")
    .map((item) => {
      const [key, order] = item.split(":");

      const column = columns[key];
      if (!column) return null;

      return order === "desc" ? desc(column) : asc(column);
    })
    .filter(Boolean);
}
