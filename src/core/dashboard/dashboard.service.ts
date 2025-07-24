import { useApiQuery } from "@/lib/data-service";
import { type UseQueryOptions } from "@tanstack/react-query";
import { getDashboard } from "./dashboard.api";
import { type DashboardItem } from "./dashboard.model";

export const useDashboard = (options?: UseQueryOptions<DashboardItem[]>) => {
  return useApiQuery<DashboardItem[]>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await getDashboard();
      return response || [];
    },
    ...options,
  });
};
