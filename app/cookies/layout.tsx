import { LayoutShell } from "../components/LayoutShell";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutShell>{children}</LayoutShell>;
};

export default Layout;
