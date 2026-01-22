import moment from "moment-timezone";

export function formatDate(
	date: string,
	normalize = true,
	format = "YYYY MMM DD, HH:mm:ss (z)",
): string {
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const dateString = normalize ? date + "Z" : date;
	const m = moment.tz(dateString, userTimeZone);

	return m.format(format);
}

export const parseDate = (dateString: string | Date | null | undefined) => {
	if (typeof dateString === "string") {
		return formatDate(dateString);
	} else if (dateString instanceof Date) {
		return formatDate(dateString.toISOString());
	} else {
		return "-";
	}
};
