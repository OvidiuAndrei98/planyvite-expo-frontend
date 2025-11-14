import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import PlanyviteLogo from "@/public/planyvite_logo.svg";
import Link from "next/link";
import { LogInIcon, MenuIcon } from "lucide-react";

const MobileNavigation = () => {
  return (
    <div className="mobile-page-navigation grid grid-cols-[auto_100px_auto] items-center px-[var(--padding-md)] py-4 border-b border-gray-200 bg-white sticky top-0 left-0 w-full z-50">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-2xl text-foreground">
                Planyvite Expo
              </SheetTitle>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <Link href="/" className="text-lg font-normal text-foreground">
                Acasa
              </Link>
              <Link
                href="/catalog-furnizori"
                className="text-lg font-normal text-foreground"
              >
                Catalog Furnizori
              </Link>
              <Link
                href="/esti-furnizor"
                className="text-lg font-normal text-foreground"
              >
                Ești Furnizor ?
              </Link>
              <Link
                href="https://planyvite.ro"
                target="_blank"
                rel="noopener noreferrer"
              >
                Invitatii Digitale
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <Image src={PlanyviteLogo} alt="logo" width={100} height={100} />
      <Button
        className="w-16 justify-self-end"
        variant="default"
        type="submit"
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        <LogInIcon />
      </Button>
    </div>
  );
};

export default MobileNavigation;
