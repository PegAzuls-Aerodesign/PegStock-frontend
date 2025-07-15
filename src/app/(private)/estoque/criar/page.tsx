import { ContentLayout } from "@/components/layout/content-layout";
import { SideNav } from "@/components/layout/sidenav";
import { CriarMaterial } from "@/core/material/ui/criar-material";

export default function CriarMaterialPage() {
  const items = [
    { label: "Estoque", href: "/estoque" },
    { label: "Criar Material", href: "/estoque/criar" },
  ];
  return (
    <SideNav items={items}>
      <ContentLayout>
        <CriarMaterial />
      </ContentLayout>
    </SideNav>
  );
}
