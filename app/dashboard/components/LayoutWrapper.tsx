"use client";
import { useState, useEffect } from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "../components/AppSideBar";
import { handleSideMenuNavigation } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const routeTitleMapper: { [key: string]: string } = {
  dashboard: "Contul meu",
  invoices: "Plati si facturi",
};

const LayoutWithSuspense = ({ children }: { children: React.ReactNode }) => {
  const [routeElements, setRouteElements] = useState<string[]>([]);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!pathName) {
      setRouteElements([]);
      return;
    }
    const pathsList = pathName
      .substring(1)
      .split("/")
      .filter((path) => path !== "");

    const knownRoutes = pathsList.filter(
      (path): path is string =>
        typeof path === "string" && routeTitleMapper.hasOwnProperty(path)
    );
    setRouteElements(knownRoutes);
  }, [pathName]);

  return (
    <SidebarProvider>
      <AppSidebar
        onClickNav={(info) => handleSideMenuNavigation(info, router)}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {routeElements.map((route, index) => {
                  const isLast = index === routeElements.length - 1;
                  const href = `/dashboard/${route}`;
                  return (
                    <React.Fragment key={route}>
                      <BreadcrumbItem
                        className={!isLast ? "hidden md:block" : ""}
                      >
                        {isLast ? (
                          <BreadcrumbPage>
                            {routeTitleMapper[route] || route}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>
                            {routeTitleMapper[route] || route}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutWithSuspense;
