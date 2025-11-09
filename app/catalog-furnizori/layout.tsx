import DesktopMenu from "@/components/navigation/DesktopMenu";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import { useIsMobile } from "@/hooks/isMobile";
import { Layout } from "lucide-react";
import { LayoutShell } from "../components/LayoutShell";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutShell>{children}</LayoutShell>;
};

export default HomeLayout;
