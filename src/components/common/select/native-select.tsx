import {
	NativeSelectOption,
	NativeSelect as NativeSelectUI,
} from "@/components/ui/native-select";

type Option = {
	value: string;
	label: string | React.ReactNode;
};

interface NativeSelectProps {
	placeholder?: string;
	className?: string;
	options?: Option[];
	selectedValue: string | null;
	onChange: (value: string | null) => void;
	disabled?: boolean;
}

export default function NativeSelect({
	placeholder = "Select option",
	className = "",
	options,
	selectedValue,
	onChange,
	disabled = false,
}: NativeSelectProps) {
	return (
		<NativeSelectUI
			disabled={disabled}
			className={className}
			value={selectedValue || ""}
			onChange={(e) => onChange(e.target.value || null)}
		>
			<NativeSelectOption value="">{placeholder}</NativeSelectOption>
			{options?.map((option) => (
				<NativeSelectOption key={option.value} value={option.value}>
					{option.label}
				</NativeSelectOption>
			))}
		</NativeSelectUI>
	);
}
