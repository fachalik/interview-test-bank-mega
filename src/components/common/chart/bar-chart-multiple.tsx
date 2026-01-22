"use client";

import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

type BarChartMultipleProps = {
	data: Array<Record<string, unknown>>;
	config: ChartConfig;
	xAxisKey: string;
};

/**
 * Usage:
 *
 * import { BarChartMultiple } from "@/components/common/chart/bar-chart-multiple";
 *
 * const data = [
 *   { month: "January", desktop: 186, mobile: 80 },
 *   { month: "February", desktop: 305, mobile: 200 },
 *   // ...more data
 * ];
 *
 * const config = {
 *   desktop: { label: "Desktop", color: "var(--chart-1)" },
 *   mobile: { label: "Mobile", color: "var(--chart-2)" },
 * };
 *
 * <BarChartMultiple
 *   data={data}
 *   config={config}
 *   xAxisKey="month"
 * />
 */
export function BarChartMultiple({
	data,
	config,
	xAxisKey,
}: BarChartMultipleProps) {
	return (
		<ChartContainer config={config} className="w-full h-[300px]">
			<BarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey={xAxisKey}
					tickLine={false}
					tickMargin={10}
					axisLine={false}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dashed" />}
				/>
				{Object.entries(config).map(([key, { color }]) => (
					<Bar key={key} dataKey={key} fill={color as string} radius={4}>
						<LabelList
							position="top"
							offset={12}
							className="fill-foreground"
							fontSize={12}
							formatter={(value: number) => `${value.toFixed(2)}%`}
						/>
					</Bar>
				))}
				<ChartLegend
					content={<ChartLegendContent />}
					className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
				/>
			</BarChart>
		</ChartContainer>
	);
}
