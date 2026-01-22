class Logger {
	private isDevelopment(): boolean {
		return process.env.NODE_ENV === "development";
	}

	log(...args: unknown[]): void {
		if (this.isDevelopment()) {
			console.log(...args);
		}
	}

	warn(...args: unknown[]): void {
		if (this.isDevelopment()) {
			console.warn(...args);
		}
	}

	error(...args: unknown[]): void {
		if (this.isDevelopment()) {
			console.error(...args);
		}
	}

	info(...args: unknown[]): void {
		if (this.isDevelopment()) {
			console.info(...args);
		}
	}

	debug(...args: unknown[]): void {
		if (this.isDevelopment()) {
			console.debug(...args);
		}
	}
}

// Export singleton instance
export const logger = new Logger();
