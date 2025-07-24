"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartData } from "../dashboard-mock";
import { chartConfig } from "../dashboard.model";
import { useDashboard } from "../dashboard.service";
import { getShortMonthName } from "../dashboard.utils";

export const DashboardChart: React.FC = () => {
  const { data } = useDashboard();
  const formattedData = data?.map((item) => ({
    month: getShortMonthName(item.month),
    totalConsumption: item.totalConsumption,
    totalAddition: item.totalAddition,
  }));

  const totalConsumption = () =>
    data?.reduce((acc, curr) => acc + curr.totalConsumption, 0);
  const totalAddition = () =>
    data?.reduce((acc, curr) => acc + curr.totalAddition, 0);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Consumo e adição</CardTitle>
        <CardDescription>Janeiro - Dezembro 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={formattedData || chartData}
            margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={10}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={
                <rect
                  fill="var(--color-brand-blue-100)"
                  stroke="var(--color-brand-blue-200)"
                  opacity={0.5}
                />
              }
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="totalConsumption"
              fill="var(--color-totalConsumption)"
              radius={4}
            />
            <Bar
              dataKey="totalAddition"
              fill="var(--color-totalAddition)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Consumo e adição de produtos nos últimos meses
          {totalAddition > totalConsumption ? (
            <TrendingUp className="size-4 text-green-500" />
          ) : (
            <TrendingDown className="size-4 text-red-500" />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
