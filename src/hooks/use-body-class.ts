import { useEffect } from "react";

export function useBodyClass(className: string) {
	useEffect(() => {
		// Split classNames by spaces, including multi-line support
		const classList = className.split(/\s+/).filter(Boolean);

		classList.forEach((className) => {
			document.body.classList.add(className);
		});

		// Cleanup function to remove classes when the component unmounts
		return () => {
			classList.forEach((className) => {
				document.body.classList.remove(className);
			});
		};
	}, [className]); // Re-run the effect if classNames changes
}
