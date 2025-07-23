import { ContentLayout } from "@/components/layout/content-layout";
import { SideNav } from "@/components/layout/sidenav";
import { EditarMaterial } from "@/core/material/ui/editar-material";

interface Props {
  params: Promise<{ id: number }>;
}

async function VisualizarMaterialPage({ params }: Props) {
  const { id } = await params;

  const items = [
    { label: "Estoque", href: "/estoque" },
    { label: "Visualizar Material", href: `/estoque/${id}/visualizar` },
  ];

  return (
    <SideNav items={items}>
      <ContentLayout>
        <EditarMaterial id={id} readOnly />
      </ContentLayout>
    </SideNav>
  );
}

export default VisualizarMaterialPage;
