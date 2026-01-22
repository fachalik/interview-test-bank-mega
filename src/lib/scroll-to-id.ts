/**
 * Usage:
 *
 * import { scrollToId } from "../utils/scroll-to-id";
 *
 * // Scroll to an element with id="target-section"
 * scrollToId("target-section");
 *
 * // With custom options
 * scrollToId("target-section", { behavior: "smooth", block: "center" });
 */

/**
 * Scrolls smoothly to the element with the given id.
 * @param id - The id of the element to scroll to.
 * @param options - Optional scroll options.
 */

export function scrollToId(
	id: string,
	options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" },
): void {
	if (!id || typeof document === "undefined") return;
	const el = document.getElementById(id);
	if (el) {
		el.scrollIntoView(options);
	}
}
