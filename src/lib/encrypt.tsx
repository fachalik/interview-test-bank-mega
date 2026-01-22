import CryptoJS from "crypto-js";
import { logger } from "./logger";

const NEXT_PUBLIC_APP_PERSIST_SECRET =
	process.env.NEXT_PUBLIC_APP_PERSIST_SECRET;

export const encode = (value: unknown) => {
	const enc = CryptoJS.AES.encrypt(
		JSON.stringify(value),
		NEXT_PUBLIC_APP_PERSIST_SECRET ?? "",
	).toString();

	return enc;
};

export const decode = (value: string) => {
	try {
		if (value.length != 0) {
			const bytes = CryptoJS.AES.decrypt(
				value,
				NEXT_PUBLIC_APP_PERSIST_SECRET ?? "",
			);
			const bytesString = bytes.toString(CryptoJS.enc.Utf8);

			if (!bytesString)
				throw new Error("Decryption failed or resulted in empty string");

			const data = JSON.parse(bytesString);

			return data;
		}
		return false;
	} catch (error) {
		logger.error("Decryption error:", error);
		return false;
	}
};
