"use client";

import { Bar, BarChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", consumo: 186, adicao: 80 },
  { month: "February", consumo: 305, adicao: 200 },
  { month: "March", consumo: 237, adicao: 120 },
  { month: "April", consumo: 73, adicao: 190 },
  { month: "May", consumo: 209, adicao: 130 },
  { month: "June", consumo: 214, adicao: 140 },
];

import { type ChartConfig } from "@/components/ui/chart";
import { DashboardChart } from "@/core/dashboard/ui/dashboard-chart";

const chartConfig = {
  consumo: {
    label: "Consumo",
    color: "#2563eb",
  },
  adicao: {
    label: "Adição",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function MyChart() {
  return (
    <div className="size-2/3">
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData}>
          <Bar dataKey="consumo" fill="var(--color-consumo)" />
          <Bar dataKey="adicao" fill="var(--color-adicao)" />
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
      <DashboardChart />
    </div>
  );
}
