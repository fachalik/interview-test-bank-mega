/** biome-ignore-all lint/suspicious/noExplicitAny: false positive*/
"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format-currency";
import { ColumnDef } from "@tanstack/react-table";
import { CreditsLeads } from "@/db/schema";

export const getColumns = (): ColumnDef<CreditsLeads>[] => [
	{
		id: "Customer Name",
		accessorFn: (row) => row.customer_name,
		header: "Customer Name",
		minSize: 150,
		size: 200,
		cell: ({ row }) => (
			<div>
				<span>{row.original.customer_name}</span>
			</div>
		),
		meta: {
			headerClassName: "",
			cellClassName: "text-start",
			skeleton: <Skeleton className="h-7 w-full" />,
		},
	},
	{
		accessorKey: "Amount",
		accessorFn: (row) => row.amount,
		header: "Amount",
		minSize: 150,
		size: 200,
		cell: ({ row }) => (
			<div>
				<span>{formatCurrency(+row.original.amount, "Rp.")}</span>
			</div>
		),
		meta: {
			headerClassName: "",
			cellClassName: "text-start",
			skeleton: <Skeleton className="h-7 w-full" />,
		},
	},
	{
		accessorKey: "Status",
		accessorFn: (row) => row.status,
		header: "Status",
		minSize: 150,
		size: 200,
		cell: ({ row }) => <Badge>{row.original.status}</Badge>,
		meta: {
			headerClassName: "",
			cellClassName: "text-start",
			skeleton: <Skeleton className="h-7 w-full" />,
		},
	},
	// {
	// 	accessorKey: "Created By",
	// 	accessorFn: (row) => row.createdBy,
	// 	header: "Created By",
	// 	minSize: 150,
	// 	size: 200,
	// 	cell: ({ row }) => <Badge>{row.original.createdBy?.name}</Badge>,
	// 	meta: {
	// 		headerClassName: "",
	// 		cellClassName: "text-start",
	// 		skeleton: <Skeleton className="h-7 w-full" />,
	// 	},
	// },
	// {
	// 	accessorKey: "Approved By",
	// 	accessorFn: (row) => row.approvedBy,
	// 	header: "Approved By",
	// 	minSize: 150,
	// 	size: 200,
	// 	cell: ({ row }) => <Badge>{row.original.approvedBy?.name ?? "-"}</Badge>,
	// 	meta: {
	// 		headerClassName: "",
	// 		cellClassName: "text-start",
	// 		skeleton: <Skeleton className="h-7 w-full" />,
	// 	},
	// },
	{
		accessorKey: "Created At",
		accessorFn: (row) => row.created_at,
		header: "Created At",
		minSize: 150,
		size: 200,
		cell: ({ row }) => (
			<p>{row.original.created_at?.toLocaleString?.() ?? ""}</p>
		),
		meta: {
			headerClassName: "",
			cellClassName: "text-start",
			skeleton: <Skeleton className="h-7 w-full" />,
		},
	},
];
