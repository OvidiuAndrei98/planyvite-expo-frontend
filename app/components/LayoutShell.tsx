"use client";

import DesktopMenu from "@/components/navigation/DesktopMenu";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import { useIsMobile } from "@/hooks/isMobile";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {useIsMobile() ? <MobileNavigation /> : <DesktopMenu />}
      {children}
    </>
  );
}
