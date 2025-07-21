import { ContentLayout } from "@/components/layout/content-layout";
import { SideNav } from "@/components/layout/sidenav";
import { CriarEmprestimo } from "@/core/emprestimo/ui/criar-emprestimo";

export default function CriarEmprestimoPage() {
  const items = [
    { label: "Estoque", href: "/emprestimos" },
    { label: "Criar Emprestimo", href: "/emprestimos/criar" },
  ];
  return (
    <SideNav items={items}>
      <ContentLayout>
        <CriarEmprestimo />
      </ContentLayout>
    </SideNav>
  );
}
