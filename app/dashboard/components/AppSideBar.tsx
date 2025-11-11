import * as React from "react";
import {
  LayoutTemplate,
  LucideCheckCircle,
  LucideHouse,
  ReceiptText,
  Settings,
  Settings2,
  TrendingUp,
} from "lucide-react";
import PlanyviteLogoSmall from "@/public/planyvite_logo_sm.svg";
import { NavMain } from "@/app/dashboard/components/NavMain";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useAuth } from "@/core/context/authContext";
import { NavUser } from "./NavUser";

export interface MenuItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
  onClick?: (info: { title: string; url: string }) => void;
  subMenu?: MenuItem[];
}

export type MenuData = Record<string, MenuItem[]>;

export function AppSidebar({
  onClickNav,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onClickNav: (info: { title: string; url: string }) => void;
}) {
  const user = useAuth().userDetails;

  const data: MenuData = {
    navMain: [
      {
        title: "Setari frunizor",
        url: `/dashboard/setari-furnizor`,
        icon: <Settings />,
        onClick: onClickNav,
      },
    ],
  };
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      className="event-sidebar"
      id="event-sidebar"
    >
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <a href="/dashboard">
            <div className="flex aspect-square size-8 items-center justify-center bg-[#FAFAFA] rounded-lg text-sidebar-primary-foreground">
              <Image
                src={PlanyviteLogoSmall}
                alt="logo"
                width={24}
                height={24}
              />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <div className="flex flex-row items-center gap-2">
                <span className="truncate font-semibold">Planyvite Expo</span>
                {user?.providerPlan === "pro" && (
                  <Badge
                    variant="default"
                    className="text-[#B46ACB] bg-[#F8E5FD] rounded-md text-xs font-medium"
                  >
                    {user?.providerPlan.charAt(0).toUpperCase() +
                      user?.providerPlan.slice(1)}
                  </Badge>
                )}
                {user?.providerPlan === "free" && (
                  <Badge
                    variant="default"
                    className="text-[grey] bg-[#F5F8FA] rounded-md text-xs font-medium"
                  >
                    {user?.providerPlan.charAt(0).toUpperCase() +
                      user?.providerPlan.slice(1)}
                  </Badge>
                )}
              </div>
              <span className="truncate text-xs">dashboard</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
