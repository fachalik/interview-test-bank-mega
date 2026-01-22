/** biome-ignore-all lint/suspicious/noExplicitAny: false positive*/
"use client";

import TooltipComponent from "@/components/common/tooltip";
import { Button } from "@/components/ui/button";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, parseDate } from "@/lib/format-date-id";
// import { ProductCategory } from "@/services/product-category/types";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, PencilIcon, Trash2Icon } from "lucide-react";

export const getColumns = (
	handleDetail: (row: any) => void,
	handleEdit: (row: any) => void,
	handleDelete: (row: any) => void,
): ColumnDef<any>[] => [
	{
		id: "Name",
		accessorFn: (row) => row.name,
		header: ({ column }) => (
			<DataGridColumnHeader title="Name" column={column} />
		),
		minSize: 150,
		size: 200,
		cell: ({ row }) => (
			<div>
				<span>{row.original.name}</span>
			</div>
		),
		meta: {
			headerClassName: "",
			cellClassName: "text-start",
			skeleton: <Skeleton className="h-7 w-full" />,
		},
	},
	{
		accessorKey: "Description",
		accessorFn: (row) => row.description,
		header: ({ column }) => (
			<DataGridColumnHeader title="Description" column={column} />
		),
		minSize: 150,
		size: 200,
		cell: ({ row }) => (
			<div>
				<span>{row.original.description}</span>
			</div>
		),
		meta: {
			headerClassName: "",
			cellClassName: "text-start",
			skeleton: <Skeleton className="h-7 w-full" />,
		},
	},
	{
		accessorKey: "Created At",
		accessorFn: (row) => row.created_at,
		header: ({ column }) => (
			<DataGridColumnHeader title="Created At" column={column} />
		),
		minSize: 150,
		size: 200,
		cell: ({ row }) => <p>{formatDate(parseDate(row.original.created_at))}</p>,
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

				<TooltipComponent content="Edit" side="top">
					<Button
						mode="icon"
						size={"xs"}
						className="cursor-pointer"
						onClick={() => {
							handleEdit(row.original);
						}}
					>
						<PencilIcon className="h-4 w-4" />
					</Button>
				</TooltipComponent>

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
					>
						<Trash2Icon className="h-4 w-4" />
					</Button>
				</TooltipComponent>
			</div>
		),
		meta: {
			headerClassName: "",
			cellClassName: "text-center",
			skeleton: <Skeleton className="h-7 w-full" />,
		},
	},
];
