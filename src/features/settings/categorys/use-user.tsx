// "use client";

// import { PayloadGetUserManagement } from "@/services/user-management/types";
// import { usePathname, useRouter } from "next/navigation";
// import { useCallback, useRef, useTransition } from "react";

// export const useUrlParams = (currentParams: PayloadGetUserManagement) => {
// 	const router = useRouter();
// 	const pathname = usePathname();
// 	const [isPending, startTransition] = useTransition();
// 	const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

// 	const createQueryString = useCallback(
// 		(params: Record<string, string | number | null>) => {
// 			const newSearchParams = new URLSearchParams();

// 			// Keep existing params and update with new ones
// 			Object.entries({ ...currentParams, ...params }).forEach(
// 				([key, value]) => {
// 					if (value !== null && value !== undefined && value !== "") {
// 						newSearchParams.set(key, String(value));
// 					}
// 				},
// 			);

// 			return newSearchParams.toString();
// 		},
// 		[currentParams],
// 	);

// 	const updateURL = useCallback(
// 		(params: Record<string, string | number | null>) => {
// 			startTransition(() => {
// 				router.push(`${pathname}?${createQueryString(params)}`);
// 			});
// 		},
// 		[createQueryString, pathname, router],
// 	);

// 	// Pagination methods
// 	const handlePageChange = useCallback(
// 		(newPage: number) => {
// 			updateURL({ page: newPage });
// 		},
// 		[updateURL],
// 	);

// 	const handleSizeChange = useCallback(
// 		(newSize: number) => {
// 			updateURL({ page: 1, size: newSize }); // Reset to page 1 when changing size
// 		},
// 		[updateURL],
// 	);

// 	const goToFirstPage = useCallback(() => {
// 		updateURL({ page: 1 });
// 	}, [updateURL]);

// 	const goToLastPage = useCallback(
// 		(totalPages: number) => {
// 			updateURL({ page: totalPages });
// 		},
// 		[updateURL],
// 	);

// 	// Search methods
// 	const handleSearch = useCallback(
// 		(search: string) => {
// 			updateURL({ page: 1, search }); // Reset to page 1 when searching
// 		},
// 		[updateURL],
// 	);

// 	const handleDebouncedSearch = useCallback(
// 		(search: string, delay: number = 500) => {
// 			// Clear previous timeout
// 			if (searchTimeoutRef.current) {
// 				clearTimeout(searchTimeoutRef.current);
// 			}

// 			// Set new timeout
// 			searchTimeoutRef.current = setTimeout(() => {
// 				handleSearch(search);
// 			}, delay);
// 		},
// 		[handleSearch],
// 	);

// 	const handleSearchName = useCallback(
// 		(name: string) => {
// 			updateURL({ page: 1, name }); // Reset to page 1 when searching
// 		},
// 		[updateURL],
// 	);

// 	const handleDebouncedSearchName = useCallback(
// 		(name: string, delay: number = 500) => {
// 			// Clear previous timeout
// 			if (searchTimeoutRef.current) {
// 				clearTimeout(searchTimeoutRef.current);
// 			}

// 			// Set new timeout
// 			searchTimeoutRef.current = setTimeout(() => {
// 				handleSearchName(name);
// 			}, delay);
// 		},
// 		[handleSearch],
// 	);

// 	const handleSearchEmail = useCallback(
// 		(email: string) => {
// 			updateURL({ page: 1, email }); // Reset to page 1 when searching
// 		},
// 		[updateURL],
// 	);

// 	const handleDebouncedSearchEmail = useCallback(
// 		(email: string, delay: number = 500) => {
// 			// Clear previous timeout
// 			if (searchTimeoutRef.current) {
// 				clearTimeout(searchTimeoutRef.current);
// 			}

// 			// Set new timeout
// 			searchTimeoutRef.current = setTimeout(() => {
// 				handleSearchEmail(email);
// 			}, delay);
// 		},
// 		[handleSearch],
// 	);

// 	const handleChangeDateFilter = useCallback(
// 		(start_date: string, end_date: string) => {
// 			updateURL({ page: 1, start_date, end_date }); // Reset to page 1 when filtering
// 		},
// 		[updateURL],
// 	);

// 	const handleChangeSortFilter = useCallback(
// 		(value: string) => {
// 			updateURL({ page: 1, sort_by: value }); // Reset to page 1 when sorting
// 		},
// 		[updateURL],
// 	);

// 	const clearSearch = useCallback(() => {
// 		updateURL({
// 			page: 1,
// 			search: "",
// 			name: "",
// 			email: "",
// 			start_date: "",
// 			end_date: "",
// 			sort_by: "",
// 		});
// 	}, [updateURL]);

// 	const clearAllFilters = useCallback(() => {
// 		updateURL({
// 			search: "",
// 			name: "",
// 			email: "",
// 			start_date: "",
// 			end_date: "",
// 			sort_by: "",
// 		});
// 	}, [updateURL]);

// 	return {
// 		// Core methods
// 		updateURL,
// 		isPending,

// 		// Pagination
// 		handlePageChange,
// 		handleSizeChange,
// 		goToFirstPage,
// 		goToLastPage,

// 		// Search & Filters
// 		handleSearch,
// 		handleDebouncedSearch,
// 		handleChangeDateFilter,
// 		handleChangeSortFilter,
// 		handleSearchName,
// 		handleDebouncedSearchName,
// 		handleSearchEmail,
// 		handleDebouncedSearchEmail,

// 		clearSearch,
// 		clearAllFilters,
// 	};
// };
