"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { FaDatabase, FaHome, FaShoppingCart, FaSignal } from "react-icons/fa";

const projects = [
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

export function NavProjects() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>PegAzuls</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon title={`${item.name}`} />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
