import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumbs,
  type BreadcrumbsProps,
} from "@/components/ui/breadcrumbs";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

interface Props extends BreadcrumbsProps {
  children: React.ReactNode;
}

export const SideNav: React.FC<Props> = ({ items, children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumbs items={items} />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
