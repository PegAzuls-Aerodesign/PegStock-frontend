"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDatabase, FaHome, FaShoppingCart, FaSignal } from "react-icons/fa";

const menuItems = [
  {
    name: "Home",
    url: "/home",
    icon: FaHome,
  },
  {
    name: "Estoque",
    url: "/estoque",
    icon: FaDatabase,
  },
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: FaSignal,
  },
  {
    name: "Lista de Compras",
    url: "/lista-de-compras",
    icon: FaShoppingCart,
  },
];

export function NavSidebar() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>PegAzuls</SidebarGroupLabel>
      <SidebarMenu>
        {menuItems.map((item) => {
          const isActive = pathname.includes(item.url);
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={cn({ "bg-brand-blue-200": isActive })}
              >
                <Link href={item.url}>
                  <item.icon title={`${item.name}`} />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
