import { api } from "@/lib/api";
import { type DashboardItem } from "./dashboard.model";

const base_url = "/dashboard";

export async function getDashboard(): Promise<DashboardItem[]> {
  const response = await api.get<DashboardItem[]>(base_url);
  return response.data;
}
