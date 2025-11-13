import "@/lib/firebase/firebaseConfig"; // Ensure Firebase is initialized
import { AuthenticationBoundary } from "@/core/AuthenticationBoundary";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthenticationBoundary>{children}</AuthenticationBoundary>;
};

export default HomeLayout;
