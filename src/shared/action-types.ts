export type PrevState<T> = {
	message: string;
	success: boolean;
	errors: Record<string, string[]> | unknown;
	data: T;
};
