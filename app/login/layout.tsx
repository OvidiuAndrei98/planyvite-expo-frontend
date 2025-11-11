import "@/lib/firebase/firebaseConfig"; // Ensure Firebase is initialized
import { Metadata } from "next";
import { AuthenticationBoundary } from "@/core/AuthenticationBoundary";
// import { Toaster } from 'sonner';

// export const metadata: Metadata = {
//   generator: "Next.js",
//   applicationName: "Planyvite - Planifică Evenimente Fără Stres",
//   referrer: "origin-when-cross-origin",
//   publisher: "planyvite.ro",
//   openGraph: {
//     siteName: "Planyvite - Planifică Evenimente Fără Stres",
//     title: "Planyvite - Invitații Digitale Personalizate Nunta | Botez",
//   },
//   title: {
//     absolute: "Invitații Digitale Personalizate și Creative | Planyvite",
//   },
//   description: `Economisește timp, reduce risipa și impresionează-ți oaspeții cu
//             invitații digitale personalizate. Urmărește RSVP-urile în timp real
//             și concentrează-te pe ceea ce contează cu adevărat: evenimentul tău.`,
// };

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthenticationBoundary>{children}</AuthenticationBoundary>;
};

export default LoginLayout;
