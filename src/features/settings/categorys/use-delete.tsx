// import { deleteCategory } from "@/app/(admin)/settings/categorys/actions";
// import useBolean from "@/hooks/use-boolean";
// import { PrevState } from "@/shared/action-types";
// import { useActionState, useEffect } from "react";
// import { toast } from "sonner";

// export default function useDelete() {
// 	const { active, toggle } = useBolean();

// 	const [state, formAction, isPending] = useActionState<
// 		PrevState<Response | null>,
// 		FormData
// 	>(deleteCategory, {
// 		message: "",
// 		errors: {},
// 		data: null,
// 		success: false,
// 	});

// 	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
// 	useEffect(() => {
// 		if (state?.success) {
// 			toggle();
// 			toast.success(state.message || "User deleted successfully");
// 		} else if (state?.message) {
// 			toast.error(state.message);
// 		}
// 	}, [state]);

// 	return {
// 		active,
// 		toggle,
// 		formAction,
// 		isPending,
// 	};
// }
