// "use client";

// import { Container } from "@/components/common/container";
// import { DialogComponent } from "@/components/common/dialog";
// import RangeDatePicker from "@/components/common/range-date-picker";
// import { Table } from "@/components/common/table";
// import { Button } from "@/components/ui/button";
// import { Input, InputGroup } from "@/components/ui/input";
// import useBolean from "@/hooks/use-boolean";
// // import {
// // 	PayloadGetProductCategory,
// // 	ProductCategory,
// // } from "@/services/product-category/types";
// import { Plus } from "lucide-react";
// import { startTransition, useRef, useState } from "react";
// import { DateRange } from "react-day-picker";
// import { getColumns } from "./columns";
// // import FormCreate from "./create-form";
// import FormEdit from "./edit-form";
// import useDelete from "./use-delete";
// import { useUrlParams } from "./use-user";

// interface IProps {
// 	data: undefined[];
// 	page: number;
// 	pageSize: number;
// 	totalPages: number;
// 	totalData: number;
// 	searchParams: Omit<undefined, "page" | "size">;
// }

// export default function CategoryManagement({
// 	data,
// 	page,
// 	pageSize,
// 	searchParams,
// 	totalData,
// 	totalPages,
// }: IProps) {
// 	const inputRef = useRef<HTMLInputElement>(null);
// 	const [date, setDate] = useState<DateRange | undefined>(undefined);
// 	const [detailData, setDetailData] = useState<undefined | null>(null);
// 	const { end_date, search, sort_by, start_date, name } = searchParams;

// 	const { active: activeCreate, toggle: toggleCreate } = useBolean();

// 	const { active: activeDetail, toggle: toggleDetail } = useBolean();

// 	const { active: activeEdit, toggle: toggleEdit } = useBolean();

// 	const {
// 		active: isDeleteDialogOpen,
// 		toggle: toggleDeleteDialog,
// 		formAction: formActionDeleteUser,
// 		isPending: isDeletingUser,
// 	} = useDelete();

// 	const {
// 		handleChangeDateFilter,
// 		clearAllFilters,
// 		handleDebouncedSearch,
// 		handleChangeSortFilter,
// 		handlePageChange,
// 		handleSizeChange,
// 	} = useUrlParams({
// 		end_date,
// 		search,
// 		sort_by,
// 		start_date,
// 		name,
// 		page,
// 		size: pageSize,
// 	});

// 	const handleDateChange = (selectedDate: DateRange | undefined) => {
// 		setDate(selectedDate);

// 		const start_date = selectedDate?.from?.toISOString().split("T")[0] ?? "";
// 		const end_date = selectedDate?.to?.toISOString().split("T")[0] ?? "";

// 		if (start_date && end_date) {
// 			handleChangeDateFilter(start_date, end_date);
// 		}
// 	};

// 	const handleClearFilters = () => {
// 		clearAllFilters();
// 		setDate(undefined);

// 		if (inputRef.current) {
// 			inputRef.current.value = "";
// 		}
// 	};

// 	const hasActiveFilters = Boolean(
// 		searchParams.search ||
// 			searchParams.start_date ||
// 			searchParams.end_date ||
// 			searchParams.sort_by ||
// 			searchParams.name,
// 	);

// 	const handleDetail = (row: undefined) => {
// 		setDetailData(row);
// 		toggleDetail();
// 	};
// 	const handleEdit = (row: undefined) => {
// 		setDetailData(row);
// 		toggleEdit();
// 	};
// 	const handleDelete = (row: undefined) => {
// 		setDetailData(row);
// 		toggleDeleteDialog();
// 	};

// 	const handleDeleteConfirm = async () => {
// 		startTransition(() => {
// 			const formData = new FormData();
// 			formData.append("id", detailData?.id?.toString() || "");

// 			formActionDeleteUser(formData);
// 		});
// 	};

// 	const columns = getColumns(handleDetail, handleEdit, handleDelete);
// 	return (
// 		<Container className="space-y-2.5">
// 			<div className="flex flex-col md:flex-row justify-between md:items-center gap-2.5">
// 				<h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
// 					Product Category
// 				</h2>

// 				<div className="flex space-x-2.5">
// 					<InputGroup className="w-full md:w-56">
// 						<Input
// 							ref={inputRef}
// 							placeholder="Search category..."
// 							onChange={(e) => handleDebouncedSearch(e.target.value)}
// 						/>
// 					</InputGroup>

// 					<RangeDatePicker
// 						date={date}
// 						setDate={handleDateChange}
// 						handleResetFilter={() => {
// 							handleChangeDateFilter("", "");
// 						}}
// 					/>

// 					<Button onClick={toggleCreate}>
// 						<Plus />
// 						Create Product Category
// 					</Button>

// 					{hasActiveFilters && (
// 						<Button variant="destructive" onClick={handleClearFilters}>
// 							Clear Filters
// 						</Button>
// 					)}
// 				</div>
// 			</div>

// 			<Table<undefined>
// 				data={data}
// 				columns={columns}
// 				searchSort={searchParams.sort_by}
// 				onSortChange={handleChangeSortFilter}
// 				pagination={{
// 					page,
// 					pageSize,
// 					totalPages,
// 					totalData,
// 					onPageChange: handlePageChange,
// 					onPageSizeChange: handleSizeChange,
// 				}}
// 				getRowId={(row) => row.id.toString()}
// 				recordCount={totalData}
// 			/>

// 			{/* <FormCreate onOpenChange={toggleCreate} open={activeCreate} /> */}

// 			<FormEdit
// 				onOpenChange={toggleDetail}
// 				open={activeDetail}
// 				product_category={detailData!}
// 				disabled
// 			/>

// 			<FormEdit
// 				onOpenChange={toggleEdit}
// 				open={activeEdit}
// 				product_category={detailData!}
// 			/>

// 			<DialogComponent
// 				title="Delete Product Category ?"
// 				description={
// 					<p>
// 						Are you sure you want to delete the product category{" "}
// 						<strong>{detailData?.name}</strong>? This action cannot be undone.
// 					</p>
// 				}
// 				open={isDeleteDialogOpen}
// 				onOpenChange={toggleDeleteDialog}
// 				onCancel={toggleDeleteDialog}
// 				onConfirm={handleDeleteConfirm}
// 				isPending={isDeletingUser}
// 				textCancel="Cancel"
// 				textConfirm="Delete"
// 				icon={
// 					<i className="ri-delete-bin-6-line text-4xl text-red-600 mx-auto" />
// 				}
// 				footerPosition="center"
// 				confirmButtonVariant="destructive"
// 			/>
// 		</Container>
// 	);
// }
