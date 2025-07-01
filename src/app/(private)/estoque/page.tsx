import { SideNav } from "@/components/layout/sidenav";

export default function EstoquePage() {
  const items = [{ label: "Estoque", href: "/estoque" }];
  return (
    <>
      <SideNav items={items}>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video animate-pulse rounded-xl bg-green-500/50" />
            <div className="aspect-video animate-pulse rounded-xl bg-red-500/50" />
            <div className="aspect-video animate-pulse rounded-xl bg-yellow-500/50" />
            <div className="aspect-video animate-pulse rounded-xl bg-purple-500/50" />
            <div className="aspect-video animate-pulse rounded-xl bg-blue-500/50" />
            <div className="bg-sidebar-accent aspect-video animate-pulse rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SideNav>
    </>
  );
}
