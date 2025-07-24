"use client";

import { Container } from "@/components/form/container";
import { ContentLayout } from "@/components/layout/content-layout";
import { SideNav } from "@/components/layout/sidenav";
import { DashboardCard } from "@/core/dashboard/ui/dashboard-card";
import { DashboardChart } from "@/core/dashboard/ui/dashboard-chart";
import {
  useMostAvailableMaterial,
  useMostConsumedMaterial,
  useNearestExpirationMaterial,
} from "@/core/material/material.service";
import { formatDate } from "@/lib/utils";
import { CalendarClockIcon } from "lucide-react";
import { FaBox, FaChartLine, FaMoneyBill } from "react-icons/fa";

export default function DashboardPage() {
  const { data: maisConsumido } = useMostConsumedMaterial();
  const { data: maisDisponivel } = useMostAvailableMaterial();
  const { data: proximoVencimento } = useNearestExpirationMaterial();

  const items = [{ label: "Dashboard", href: "/dashboard" }];

  const maisConsumidoUrl = maisConsumido
    ? `/estoque/${maisConsumido.cod}/visualizar`
    : undefined;
  const maisDisponivelUrl = maisDisponivel
    ? `/estoque/${maisDisponivel.cod}/visualizar`
    : undefined;
  const proximoVencimentoUrl = proximoVencimento
    ? `/estoque/${proximoVencimento.cod}/visualizar`
    : undefined;

  const dataValidade = proximoVencimento?.expirationDate
    ? formatDate(proximoVencimento.expirationDate)
    : "N/A";

  return (
    <>
      <SideNav items={items}>
        <ContentLayout className="flex w-full flex-col items-center gap-4">
          <Container className="bg-transparent">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <DashboardCard
                title="Material mais consumido"
                description={maisConsumido?.name || "Nenhum material consumido"}
                footer={`Total: ${maisConsumido?.quantity || 0} unidades`}
                icon={<FaBox className="size-8 text-yellow-600" />}
                url={maisConsumidoUrl}
              />
              <DashboardCard
                title="Material mais disponível"
                description={
                  maisDisponivel?.name || "Nenhum material disponível"
                }
                footer={`Total: ${maisDisponivel?.quantity || 0} unidades`}
                icon={<FaChartLine className="size-8 text-green-600" />}
                url={maisDisponivelUrl}
              />
              <DashboardCard
                title="Material mais caro da lista"
                description="Controle"
                footer="R$ 1.000,00"
                icon={<FaMoneyBill className="text-brand-blue-600 size-8" />}
              />
              <DashboardCard
                title="Próximo da data de validade"
                description={
                  proximoVencimento?.name ||
                  "Nenhum material próximo da validade"
                }
                footer={`Data de validade: ${dataValidade}`}
                icon={<CalendarClockIcon className="size-8 text-red-600" />}
                url={proximoVencimentoUrl}
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
