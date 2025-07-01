"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="logo"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-0"
        >
          <Image
            src="/pegazuls-logo.svg"
            width={132}
            height={132}
            alt="Pegazuls Logo"
            className="aspect-square h-auto w-full"
          />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
