import { ApproveCreditLeads } from "@/app/(admin)/credit-leads/action";
import { CreditsLeads } from "@/db/schema";
import useBolean from "@/hooks/use-boolean";
import { PrevState } from "@/shared/action-types";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function useApprove() {
	const { active, toggle } = useBolean();

	const [state, formAction, isPending] = useActionState<
		PrevState<CreditsLeads | null>,
		FormData
	>(ApproveCreditLeads, {
		message: "",
		errors: {},
		data: null,
		success: false,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	useEffect(() => {
		if (state?.success) {
			toggle();
			toast.success(state.message || "Credit Leads Approved Successfully");
		} else if (state?.message) {
			toast.error(state.message);
		}
	}, [state]);

	return {
		active,
		toggle,
		formAction,
		isPending,
	};
}
