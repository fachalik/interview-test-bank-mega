/** biome-ignore-all lint/suspicious/noExplicitAny: false positive*/
"use client";

import TooltipComponent from "@/components/common/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format-currency";
import { ColumnDef } from "@tanstack/react-table";
import { Check, CircleOff, Eye, PencilIcon, Trash2Icon } from "lucide-react";
import { Data } from ".";

export const getColumns = (
	handleDetail: (row: Data) => void,
	handleEdit: (row: Data) => void,
	handleDelete: (row: Data) => void,
	handleApprove: (row: Data) => void,
	role: string,
): ColumnDef<Data>[] => [
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
	{
		accessorKey: "Created By",
		accessorFn: (row) => row.createdBy,
		header: "Created By",
		minSize: 150,
		size: 200,
		cell: ({ row }) => <Badge>{row.original.createdBy?.name}</Badge>,
		meta: {
			headerClassName: "",
			cellClassName: "text-start",
			skeleton: <Skeleton className="h-7 w-full" />,
		},
	},
	{
		accessorKey: "Approved By",
		accessorFn: (row) => row.approvedBy,
		header: "Approved By",
		minSize: 150,
		size: 200,
		cell: ({ row }) => <Badge>{row.original.approvedBy?.name ?? "-"}</Badge>,
		meta: {
			headerClassName: "",
			cellClassName: "text-start",
			skeleton: <Skeleton className="h-7 w-full" />,
		},
	},
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
	{
		id: "actions",
		header: "Actions",
		minSize: 120,
		size: 120,
		cell: ({ row }) => (
			<div className="flex gap-2.5">
				{role != "user" && (
					<TooltipComponent
						content={
							row?.original?.status == "approved"
								? "Reject Data"
								: "Approved Data"
						}
						side="top"
					>
						<Button
							mode="icon"
							size={"xs"}
							className="cursor-pointer"
							onClick={() => {
								handleApprove(row.original);
							}}
							variant={
								row?.original?.status != "approved" ? "primary" : "destructive"
							}
						>
							{row?.original?.status != "approved" ? (
								<Check className="h-4 w-4" />
							) : (
								<CircleOff className="h-4 w-4" />
							)}
						</Button>
					</TooltipComponent>
				)}

				{role != "approver" && (
					<TooltipComponent content="View Detail" side="top">
						<Button
							mode="icon"
							size={"xs"}
							className="cursor-pointer"
							onClick={() => {
								handleDetail(row.original);
							}}
						>
							<Eye className="h-4 w-4" />
						</Button>
					</TooltipComponent>
				)}

				{role != "approver" && (
					<TooltipComponent content="Edit" side="top">
						<Button
							mode="icon"
							size={"xs"}
							className="cursor-pointer"
							onClick={() => {
								handleEdit(row.original);
							}}
							disabled={
								row?.original.status !== "rejected" &&
								row?.original.status !== "pending"
							}
						>
							<PencilIcon className="h-4 w-4" />
						</Button>
					</TooltipComponent>
				)}

				{role != "approver" && (
					<TooltipComponent content="Delete" side="top">
						<Button
							type="button"
							mode="icon"
							size={"xs"}
							className="cursor-pointer"
							variant="destructive"
							onClick={() => {
								handleDelete(row.original);
							}}
							disabled={row?.original.status !== "pending"}
						>
							<Trash2Icon className="h-4 w-4" />
						</Button>
					</TooltipComponent>
				)}
			</div>
		),
		meta: {
			headerClassName: "",
			cellClassName: "text-center",
			skeleton: <Skeleton className="h-7 w-full" />,
		},
	},
];
