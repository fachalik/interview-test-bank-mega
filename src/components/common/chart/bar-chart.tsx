import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";

import {
	Bar,
	BarChart as BarRechart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";
import { Margin } from "recharts/types/util/types";

type BarChartProps = {
	data: Array<Record<string, unknown>>;
	config?: ChartConfig;
	xAxisKey: string;
	yAxisKey: string;
	margin?: Margin | undefined;
};

export function BarChart({
	config = {},
	data,
	xAxisKey,
	yAxisKey,
	margin,
}: BarChartProps) {
	return (
		<ChartContainer config={config} className="w-full h-[300px]">
			<BarRechart
				accessibilityLayer
				data={data}
				layout="vertical"
				margin={margin}
			>
				<CartesianGrid vertical={true} />
				<YAxis
					dataKey={yAxisKey}
					type="category"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
				/>
				<XAxis dataKey={xAxisKey} type="number" />
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dashed" />}
				/>
				<Bar dataKey={xAxisKey} layout="vertical" radius={5}>
					<LabelList
						position="center"
						fontSize={12}
						formatter={(value: number) => `${value}%`}
						fill="white"
					/>
				</Bar>
			</BarRechart>
		</ChartContainer>
	);
}
