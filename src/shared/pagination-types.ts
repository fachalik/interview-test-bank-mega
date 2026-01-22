export interface Pagination<T> {
	items: T[];
	pagination: {
		current_page: number;
		current_size: number;
		pages: number;
		total: number;
	};
}
