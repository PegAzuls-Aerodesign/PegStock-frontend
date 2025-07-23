import { ContentLayout } from "@/components/layout/content-layout";
import { SideNav } from "@/components/layout/sidenav";
import { EditarEmprestimo } from "@/core/emprestimo/ui/editar-emprestimo";

interface Props {
  params: Promise<{ id: number }>;
}

async function VisualizarEmprestimoPage({ params }: Props) {
  const { id } = await params;

  const items = [
    { label: "Emprestimos", href: "/emprestimos" },
    { label: "Visualizar Emprestimos", href: `/emprestimos/${id}/visualizar` },
  ];

  return (
    <SideNav items={items}>
      <ContentLayout>
        <EditarEmprestimo id={id} readOnly />
      </ContentLayout>
    </SideNav>
  );
}

export default VisualizarEmprestimoPage;
