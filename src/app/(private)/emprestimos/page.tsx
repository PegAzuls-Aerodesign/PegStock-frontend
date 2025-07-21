import { ContentLayout } from "@/components/layout/content-layout";
import { SideNav } from "@/components/layout/sidenav";
import { EmprestimoTable } from "@/core/emprestimo/ui/emprestimo-table";

export default function EmprestimoPage() {
  const items = [{ label: "Empréstimos", href: "/emprestimos" }];
  return (
    <SideNav items={items}>
      <ContentLayout>
        <EmprestimoTable />
      </ContentLayout>
    </SideNav>
  );
}
