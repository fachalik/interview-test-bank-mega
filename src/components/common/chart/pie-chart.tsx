"use client";

import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import React from "react";
import { Label, LabelList, Pie, PieChart } from "recharts";

interface PieChartData {
	key: keyof ChartConfig;
	value: number;
	fill?: string;
}

interface IProps {
	config: ChartConfig;
	data: PieChartData[];
	dataKey?: string;
	nameKey?: string;
}

export function ChartPieLabelList({
	config,
	data,
	dataKey = "key",
	nameKey = "value",
}: IProps) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	const total = React.useMemo(() => {
		return data.reduce((acc, curr) => acc + curr.value, 0);
	}, []);

	return (
		<ChartContainer config={config} className="w-full h-[300px]">
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={data}
					dataKey={dataKey}
					nameKey={nameKey}
					innerRadius={60}
					strokeWidth={5}
				>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-foreground text-3xl font-bold"
										>
											{total.toLocaleString()}
										</tspan>
									</text>
								);
							}
						}}
					/>

					<LabelList
						dataKey={dataKey}
						className="fill-background"
						stroke="none"
						fontSize={12}
						formatter={(value: keyof ChartConfig) =>
							config[value]?.label ?? String(value)
						}
					/>
				</Pie>
				<ChartLegend
					content={<ChartLegendContent nameKey={nameKey} />}
					className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
				/>
			</PieChart>
		</ChartContainer>
	);
}
