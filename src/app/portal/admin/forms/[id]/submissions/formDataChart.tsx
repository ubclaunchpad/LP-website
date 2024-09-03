"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/primitives/chart";

export function FormChart({
  chartInfo,
  chartConfig,
  chartData,
}: {
  chartInfo: { title: string; description: string };
  chartConfig: ChartConfig;
  chartData: { id: string; label: string; count: number; fill?: string }[];
}) {
  const colouredData = chartData.map((data, index) => {
    return {
      ...data,
      fill: `var(--lp-${(((index + 1) * 100) % 500) + 400})`,
    };
  });

  return (
    <Card className={"max-w-2xl flex-1 w-full "}>
      <CardHeader>
        <CardTitle>{chartInfo.title}</CardTitle>
        <CardDescription>{chartInfo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={colouredData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              className={"min-w-80 *:text-white! max-w-none "}
              dataKey="label"
              type="category"
              tickLine={false}
              stroke={"var(--background-100)"}
              tickMargin={10}
              fill={"#ffffff"}
              width={150}
              axisLine={true}
              tickFormatter={(value) =>
                value.length > 20 ? value.slice(0, 20) + "..." : value
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" layout="vertical" radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
