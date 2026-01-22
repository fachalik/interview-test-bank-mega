import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import {
	Area,
	AreaChart as AreaReChart,
	CartesianGrid,
	ReferenceLine,
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

export function AreaChart({
	config = {},
	data,
	xAxisKey,
	yAxisKey,
}: BarChartProps) {
	return (
		<ChartContainer config={config} className="w-full h-[300px]">
			<AreaReChart
				accessibilityLayer
				data={data}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey={xAxisKey}
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dot" hideLabel />}
				/>
				<YAxis tickLine={false} axisLine={false} tickMargin={8} />
				<ReferenceLine
					y={100}
					stroke="#EF4444"
					strokeWidth={3}
					label={{
						value: `Current Threshold: ${100}`,
						position: "top",
						fill: "#EF4444",
						fontWeight: "bold",
						fontSize: 13,
					}}
					ifOverflow="extendDomain"
				/>
				<Area
					dataKey={yAxisKey}
					type="linear"
					fill={config[yAxisKey]?.color || "var(--chart-1)"}
					fillOpacity={0.4}
					stroke={config[yAxisKey]?.color || "var(--chart-1)"}
				/>
			</AreaReChart>
		</ChartContainer>
	);
}
