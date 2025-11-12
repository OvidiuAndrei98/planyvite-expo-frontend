import { LayoutShell } from "../components/LayoutShell";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutShell>{children}</LayoutShell>;
};

export default HomeLayout;
