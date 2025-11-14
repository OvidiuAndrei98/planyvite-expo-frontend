"use client";

import {
  ChevronsUpDown,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  UserIcon,
} from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import NoProfile from "@/public/no-photo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@/core/types";
import { useAuth } from "@/core/context/authContext";
import { manageSubscription } from "@/service/stripe/manageSubscription";

export function NavUser({
  user,
  subscriptionStatus,
}: {
  user: User | null;
  subscriptionStatus: string;
}) {
  const { isMobile } = useSidebar();
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user ? (
                  user?.photoURL ? (
                    <AvatarImage src={user?.photoURL} />
                  ) : (
                    <Image
                      alt="profile-image"
                      src={user?.photoURL ?? NoProfile}
                      width={32}
                      height={32}
                    />
                  )
                ) : (
                  <Image alt="profile-image" src={NoProfile} />
                )}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.displayName}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onCloseAutoFocus={(e) => e.preventDefault()}
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user ? (
                    user?.photoURL ? (
                      <AvatarImage src={user?.photoURL} />
                    ) : (
                      <Image
                        alt="profile-image"
                        src={user?.photoURL ?? NoProfile}
                        width={32}
                        height={32}
                      />
                    )
                  ) : (
                    <Image alt="profile-image" src={NoProfile} />
                  )}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.displayName}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user?.providerPlan === "free" &&
              subscriptionStatus === "no_subscription" ? (
                <DropdownMenuItem
                  className="hover:!bg-sidebar-accent cursor-pointer"
                  onClick={() => {
                    router.push(`/dashboard/upgrade-plan`);
                  }}
                >
                  <Sparkles />
                  Upgradeaza la Pro
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="hover:!bg-sidebar-accent cursor-pointer"
                  onClick={() => {
                    manageSubscription(user?.uid!);
                  }}
                >
                  <LayoutDashboard />
                  Gestionează abonament
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="hover:!bg-sidebar-accent cursor-pointer"
                onClick={() => {
                  if (!user) return;
                  router.push("/catalog-furnizori/" + user?.uid);
                }}
              >
                <UserIcon />
                Vezi profil furnizor
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:!bg-sidebar-accent cursor-pointer"
                onClick={() => {
                  router.push("/dashboard/account");
                }}
              >
                <Settings />
                Cont
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:!bg-sidebar-accent cursor-pointer"
                onClick={() => {
                  router.push(`/dashboard/facturi`);
                }}
              >
                <CreditCard />
                Facturare
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:!bg-sidebar-accent cursor-pointer"
              onClick={() => logout()}
            >
              <LogOut />
              Iesi din cont
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
