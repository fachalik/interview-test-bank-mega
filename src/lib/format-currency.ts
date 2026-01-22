export const formatCurrency = (amount: number, currency: string) => {
	return `${currency} ${amount.toLocaleString()}`;
};
