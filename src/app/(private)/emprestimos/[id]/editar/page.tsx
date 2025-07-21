import { ContentLayout } from "@/components/layout/content-layout";
import { SideNav } from "@/components/layout/sidenav";
import { EditarEmprestimo } from "@/core/emprestimo/ui/editar-emprestimo";

interface Props {
  params: Promise<{ id: number }>;
}

async function EditarEmprestimoPage({ params }: Props) {
  const { id } = await params;

  const items = [
    { label: "Emprestimos", href: "/emprestimos" },
    { label: "Editar Emprestimos", href: `/estoque/${id}/editar` },
  ];

  return (
    <SideNav items={items}>
      <ContentLayout>
        <EditarEmprestimo id={id} />
      </ContentLayout>
    </SideNav>
  );
}

export default EditarEmprestimoPage;
