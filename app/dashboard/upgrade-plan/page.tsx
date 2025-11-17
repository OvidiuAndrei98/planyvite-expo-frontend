"use client";

import { act, useEffect, useState } from "react";
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
import { getDetailedSubscriptionStatus } from "@/service/core/statusResolverService";
import { Spinner } from "@/components/ui/spinner";

export default function UpgradePlanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuth().userDetails;
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const activeSubscription = async () => {
      if (user) {
        const status = await getDetailedSubscriptionStatus(user.uid);
        switch (status) {
          case "active":
            setActiveSubscription(true);
            break;
          default:
            setActiveSubscription(false);
            break;
        }
        setPageLoading(false);
      }
    };
    activeSubscription();
  }, [user]);

  const handleUpgrade = async () => {
    setIsLoading(true);
    await planUpgradeCheckout(user?.uid!, isAnnual);
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

  return pageLoading ? (
    <div className="flex items-center justify-center h-screen">
      <Spinner color="#7b34f9" />
    </div>
  ) : (
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
              {!activeSubscription ? (
                <CardDescription>Planul tau curent</CardDescription>
              ) : (
                <CardDescription>Functionalitati de baza</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-4">GRATUIT</div>
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
              <div className="mb-4">
                <div className="flex items-center justify-start gap-4 mb-4">
                  <span
                    className={`text-sm ${
                      !isAnnual ? "font-semibold" : "text-gray-500"
                    }`}
                  >
                    Lunar
                  </span>
                  <button
                    onClick={() => setIsAnnual(!isAnnual)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isAnnual ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isAnnual ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`text-sm ${
                      isAnnual ? "font-semibold" : "text-gray-500"
                    }`}
                  >
                    Anual
                    {isAnnual && (
                      <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        -17%
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold mb-4">
                RON {isAnnual ? "390" : "39"}/{isAnnual ? "an" : "luna"}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  facturat {isAnnual ? "anual" : "lunar"}
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
              {activeSubscription ? (
                <Button
                  className="w-full"
                  onClick={() => user && manageSubscription(user?.uid)}
                >
                  Gestioneaza
                </Button>
              ) : (
                <Button
                  disabled={isLoading}
                  className="w-full"
                  onClick={handleUpgrade}
                >
                  {isLoading ? "Procesare..." : "Cumpara plan"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
