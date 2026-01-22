"use client";

import { Container } from "@/components/common/container";
import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { Input, InputGroup } from "@/components/ui/input";
import useBolean from "@/hooks/use-boolean";

import { Plus } from "lucide-react";
import { startTransition, useRef, useState } from "react";
import { getColumns } from "./columns";

import { DialogComponent } from "@/components/common/dialog";
import FormCreate from "./create-form";
import FormEdit from "./edit-form";
import useDelete from "./use-delete";
import { UrlParamsCreditLeads, useUrlParams } from "./use-search-params";

export interface Data {
	id: string;
	customer_name: string;
	amount: string;
	status: string;
	created_at: string | Date;
	createdBy: {
		id: string;
		username: string;
		name: string;
		email: string;
	} | null;
	approvedBy: {
		id: string;
		username: string;
		name: string;
		email: string;
	} | null;
}

interface IProps {
	data: Data[];
	page: number;
	pageSize: number;
	totalPages: number;
	totalData: number;
	searchParams: Omit<UrlParamsCreditLeads, "page" | "size">;
}

export default function CreditLeads({
	data,
	page,
	pageSize,
	searchParams,
	totalData,
	totalPages,
}: IProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [detailData, setDetailData] = useState<Data | null>(null);
	const { search, sort_by, name } = searchParams;

	const { active: activeCreate, toggle: toggleCreate } = useBolean();

	const { active: activeDetail, toggle: toggleDetail } = useBolean();

	const { active: activeEdit, toggle: toggleEdit } = useBolean();

	const {
		active: isDeleteDialogOpen,
		toggle: toggleDeleteDialog,
		formAction: formActionDeleteUser,
		isPending: isDeletingUser,
	} = useDelete();

	const {
		clearAllFilters,
		handleDebouncedSearch,
		handleChangeSortFilter,
		handlePageChange,
		handleSizeChange,
	} = useUrlParams({
		search,
		sort_by,
		name,
		page,
		size: pageSize,
	});

	const handleClearFilters = () => {
		clearAllFilters();

		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	const hasActiveFilters = Boolean(searchParams.sort_by || searchParams.name);

	const handleDetail = (row: Data) => {
		setDetailData(row);
		toggleDetail();
	};
	const handleEdit = (row: Data) => {
		setDetailData(row);
		toggleEdit();
	};
	const handleDelete = (row: Data) => {
		setDetailData(row);
		toggleDeleteDialog();
	};

	const handleDeleteConfirm = async () => {
		startTransition(() => {
			const formData = new FormData();
			formData.append("id", detailData?.id?.toString() || "");
			formActionDeleteUser(formData);
		});
	};

	const columns = getColumns(handleDetail, handleEdit, handleDelete);
	return (
		<Container className="space-y-2.5">
			<div className="flex flex-col md:flex-row justify-between md:items-center gap-2.5">
				<h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
					Product Category
				</h2>

				<div className="flex space-x-2.5">
					<InputGroup className="w-full md:w-56">
						<Input
							ref={inputRef}
							placeholder="Search category..."
							onChange={(e) => handleDebouncedSearch(e.target.value)}
						/>
					</InputGroup>

					<Button onClick={toggleCreate}>
						<Plus />
						Create Credit Lead
					</Button>

					{hasActiveFilters && (
						<Button variant="destructive" onClick={handleClearFilters}>
							Clear Filters
						</Button>
					)}
				</div>
			</div>

			<Table<Data>
				data={data}
				columns={columns}
				searchSort={searchParams.sort_by}
				onSortChange={handleChangeSortFilter}
				pagination={{
					page,
					pageSize,
					totalPages,
					totalData,
					onPageChange: handlePageChange,
					onPageSizeChange: handleSizeChange,
				}}
				getRowId={(row) => row.id.toString()}
				recordCount={totalData}
			/>

			<FormCreate onOpenChange={toggleCreate} open={activeCreate} />

			<FormEdit
				onOpenChange={toggleDetail}
				open={activeDetail}
				data={detailData!}
				disabled
			/>

			<FormEdit
				onOpenChange={toggleEdit}
				open={activeEdit}
				data={detailData!}
			/>

			<DialogComponent
				title="Delete Credit Lead ?"
				description={
					<p>
						Are you sure you want to delete the credit lead{" "}
						<strong>{detailData?.customer_name}</strong>? This action cannot be
						undone.
					</p>
				}
				open={isDeleteDialogOpen}
				onOpenChange={toggleDeleteDialog}
				onCancel={toggleDeleteDialog}
				onConfirm={handleDeleteConfirm}
				isPending={isDeletingUser}
				textCancel="Cancel"
				textConfirm="Delete"
				icon={
					<i className="ri-delete-bin-6-line text-4xl text-red-600 mx-auto" />
				}
				footerPosition="center"
				confirmButtonVariant="destructive"
			/>
		</Container>
	);
}
