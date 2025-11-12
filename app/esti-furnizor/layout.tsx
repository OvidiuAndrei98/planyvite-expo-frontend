import { LayoutShell } from "../components/LayoutShell";

const BecomeProviderPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <LayoutShell>{children}</LayoutShell>;
};

export default BecomeProviderPageLayout;
