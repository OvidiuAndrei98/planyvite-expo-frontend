import DesktopMenu from "@/components/navigation/DesktopMenu";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DesktopMenu />
      {children}
    </>
  );
};

export default HomeLayout;
