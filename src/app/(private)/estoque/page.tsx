import { ContentLayout } from "@/components/layout/content-layout";
import { SideNav } from "@/components/layout/sidenav";
import { MaterialTable } from "@/core/material/ui/material-table";

export default function EstoquePage() {
  const items = [{ label: "Estoque", href: "/estoque" }];
  return (
    <SideNav items={items}>
      <ContentLayout>
        <MaterialTable />
      </ContentLayout>
    </SideNav>
  );
}
