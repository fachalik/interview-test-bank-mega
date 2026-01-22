"use client";

/**
 * Table Component Usage
 *
 * Import:
 *   import { Table } from "@/components/common/table";
 *
 * Basic Example:
 *
 *   type MyDataType = { id: string; name: string };
 *   const columns: ColumnDef<MyDataType, unknown>[] = [
 *     { accessorKey: "id", header: "ID" },
 *     { accessorKey: "name", header: "Name" },
 *   ];
 *
 *   <Table<MyDataType>
 *     data={data}
 *     columns={columns}
 *     getRowId={row => row.id}
 *   />
 *
 * With Pagination and Sorting:
 *
 *   <Table<MyDataType>
 *     data={data}
 *     columns={columns}
 *     searchSort={searchParams.sort}
 *     onSortChange={handleChangeSortFilter}
 *     pagination={{
 *       page,
 *       pageSize,
 *       totalPages,
 *       totalData,
 *       onPageChange: handlePageChange,
 *       onPageSizeChange: handleSizeChange,
 *     }}
 *     getRowId={row => row.id}
 *     recordCount={totalData}
 *   />
 *
 * Props:
 * - data: Array of row data.
 * - columns: Array of ColumnDef objects (see @tanstack/react-table docs).
 * - searchSort: (optional) String for current sort state, e.g. "name:asc,id:desc".
 * - onSortChange: (optional) Callback when sort changes.
 * - pagination: (optional) Pagination config object.
 * - getRowId: Function to return a unique row ID.
 * - recordCount: (optional) Total number of records.
 *
 * Generics:
 * - <T extends Record<string, unknown>>: The type of your row data.
 *
 * Example with generics:
 *   <Table<FormValues> ... />
 */

import { Pagination } from "@/components/common/pagination";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	ColumnDef,
	getCoreRowModel,
	getPaginationRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface TableProps<T extends object> {
	data: T[];
	columns: ColumnDef<T>[];
	searchSort?: string;
	onSortChange?: (sort: string) => void;
	pagination?: {
		page: number;
		pageSize: number;
		totalPages: number;
		totalData: number;
		onPageChange: (page: number) => void;
		onPageSizeChange: (size: number) => void;
	};
	getRowId: (row: T) => string;
	recordCount?: number;
}

export function Table<T extends object>({
	data,
	columns,
	searchSort,
	onSortChange,
	pagination,
	getRowId,
	recordCount,
}: TableProps<T>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [paginationState, setPaginationState] = useState({
		pageIndex: pagination ? pagination.page - 1 : 0,
		pageSize: pagination ? pagination.pageSize : 10,
	});

	useEffect(() => {
		if (!searchSort) {
			setSorting([]);
			return;
		}
		const sortArray = searchSort.split(",").map((sortField) => {
			const [id, direction] = sortField.split(":");
			return {
				id,
				desc: direction === "desc",
			};
		});
		setSorting(sortArray);
	}, [searchSort]);

	const table = useReactTable({
		columns,
		data,
		enableMultiSort: true,
		maxMultiSortColCount: 3,
		pageCount: pagination
			? pagination?.totalPages
			: data.length / paginationState.pageSize,
		getRowId,
		state: {
			pagination: {
				pageIndex: paginationState.pageIndex,
				pageSize: paginationState.pageSize,
			},
			sorting,
		},
		onSortingChange: (updater) => {
			if (!onSortChange) return;
			const next = typeof updater === "function" ? updater(sorting) : updater;
			if (!next.length) {
				setSorting([]);
				onSortChange("");
				return;
			}
			const sortFields = next
				.map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`)
				.join(",");
			setSorting(next);
			onSortChange(sortFields);
		},
		getCoreRowModel: getCoreRowModel(),
		...(pagination
			? {}
			: {
					getPaginationRowModel: getPaginationRowModel(),
					onPaginationChange: setPaginationState,
				}),
		manualPagination: !!pagination,
		manualSorting: !!onSortChange,
		manualFiltering: true,
	});

	return (
		<DataGrid table={table} recordCount={recordCount ?? data.length}>
			<div className="w-full space-y-2.5">
				<DataGridContainer>
					<ScrollArea>
						<DataGridTable />
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</DataGridContainer>
				{!pagination && <DataGridPagination />}
				{pagination && (
					<Pagination
						isLoading={false}
						recordCount={pagination.totalData}
						onPageChange={pagination.onPageChange}
						onPageSizeChange={pagination.onPageSizeChange}
						page={pagination.page}
						pageSize={pagination.pageSize}
						totalPages={pagination.totalPages}
					/>
				)}
			</div>
		</DataGrid>
	);
}
