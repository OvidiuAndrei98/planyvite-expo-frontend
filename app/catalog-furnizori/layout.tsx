import DesktopMenu from "@/components/navigation/DesktopMenu";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-hidden">
      <DesktopMenu />
      {children}
    </div>
  );
};

export default HomeLayout;
