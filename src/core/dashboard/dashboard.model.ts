import { type ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
  totalConsumption: {
    label: "Consumo total",
    color: "var(--color-black)",
  },
  totalAddition: {
    label: "Adição total",
    color: "var(--color-brand-blue-500)",
  },
} satisfies ChartConfig;

export interface DashboardItem {
  month: string;
  totalConsumption: number;
  totalAddition: number;
}
