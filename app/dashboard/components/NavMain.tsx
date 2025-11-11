"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { MenuItem } from "./AppSideBar";
import { useAuth } from "@/core/context/authContext";

export interface MenuItemWithPlanType extends MenuItem {
  planType?: "basic" | "premium";
}

export function NavMain({ items }: { items: MenuItem[] }) {
  const user = useAuth().userDetails;
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{user?.displayName}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title + item.url}
            onClick={() => {
              setOpenMobile(false);
              item.onClick &&
                item.onClick({ title: item.title, url: item.url });
            }}
          >
            <SidebarMenuButton tooltip={item.title} className="!cursor-pointer">
              {item.icon && item.icon}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
