import { useState } from "react";

export default function useBolean() {
	const [active, setActive] = useState(false);

	const on = () => setActive(true);
	const off = () => setActive(false);
	const toggle = () => setActive(!active);

	return {
		active,
		on,
		off,
		toggle,
	};
}
