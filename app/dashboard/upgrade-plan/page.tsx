"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Crown } from "lucide-react";
import { useAuth } from "@/core/context/authContext";
import { planUpgradeCheckout } from "@/service/stripe/upgradeProviderPlan";
import { manageSubscription } from "@/service/stripe/manageSubscription";

export default function UpgradePlanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuth().userDetails;

  const handleUpgrade = async () => {
    setIsLoading(true);
    await planUpgradeCheckout(user?.uid!);
    setIsLoading(false);
  };

  const proFeatures = [
    "Tot ce include planul gratuit",
    "Locatii multiple",
    "Vizibilitate prioritara in lista de furnizori",
    "Badge Pro pe profil",
    "Calendar de rezervari integrat",
    "5 poze pentru furnizor",
    "Connfigurare sectiune FAQ",
  ];

  return (
    <div className="flex flex-col w-full h-full bg-background p-[var(--padding-sm)] overflow-auto">
      <div className="max-w-[1024px] mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Upgrade la planul Pro</h1>
          <p className="text-muted-foreground">
            Deblocati toate functionalitatile disponibile pe platfoarma noastra
            de furnizori
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Plan Gratuit
              </CardTitle>
              <CardDescription>Planul tau curent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-4">RON 0/luna</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Acces pe platforma
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Vizibiliate in lista de furnizori
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Configurare pachete
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />O poza
                  pentru furnizor
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />O singura
                  locatie
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Configurare Informații de contact
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-primary relative">
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              Popular
            </Badge>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Plan Pro
              </CardTitle>
              <CardDescription>
                Tot ce ai nevoie pentru a crește vizibilitatea
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-4">
                RON 20/luna
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  facturat lunar (Minim 12 luni)
                </span>
              </div>
              <ul className="space-y-2">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleUpgrade}
                disabled={isLoading}
              >
                {isLoading ? "Procesare..." : "Cumpara plan"}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Button onClick={() => user && manageSubscription(user?.uid)}>
          Manage
        </Button>
      </div>
    </div>
  );
}
