import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 1024) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < breakpoint);
		};

		// Check initially
		checkIfMobile();

		// Listen for window resize
		window.addEventListener("resize", checkIfMobile);

		// Cleanup
		return () => window.removeEventListener("resize", checkIfMobile);
	}, [breakpoint]);

	return isMobile;
}
