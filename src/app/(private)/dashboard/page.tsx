import { Container } from "@/components/form/container";
import { ContentLayout } from "@/components/layout/content-layout";
import { SideNav } from "@/components/layout/sidenav";
import { DashboardCard } from "@/core/dashboard/ui/dashboard-card";
import { DashboardChart } from "@/core/dashboard/ui/dashboard-chart";
import { CalendarClockIcon } from "lucide-react";
import { FaBox, FaChartLine, FaMoneyBill } from "react-icons/fa";

export default function DashboardPage() {
  const items = [{ label: "Dashboard", href: "/dashboard" }];
  return (
    <>
      <SideNav items={items}>
        <ContentLayout className="flex w-full flex-col items-center gap-4">
          <Container className="bg-transparent">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <DashboardCard
                title="Material mais consumido"
                description="Madeira balsa"
                footer="Rodapé do Cartão"
                icon={<FaBox className="size-8 text-yellow-600" />}
              />
              <DashboardCard
                title="Material mais disponível"
                description="Madeira balsa"
                footer="Rodapé do Cartão"
                icon={<FaChartLine className="size-8 text-green-600" />}
              />
              <DashboardCard
                title="Material mais caro da lista"
                description="Controle"
                footer="R$ 1.000,00"
                icon={<FaMoneyBill className="text-brand-blue-600 size-8" />}
              />
              <DashboardCard
                title="Próximo da data de validade"
                description="Máscara"
                footer="Validade: 01/01/2025"
                icon={<CalendarClockIcon className="size-8 text-red-600" />}
              />
            </div>
          </Container>
          <div className="w-full self-center lg:size-4/5">
            <DashboardChart />
          </div>
        </ContentLayout>
      </SideNav>
    </>
  );
}
