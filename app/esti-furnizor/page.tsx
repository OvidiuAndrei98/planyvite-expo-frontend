"use client";

import { Badge } from "@/components/ui/badge";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GlowingCards, { GlowingCard } from "@/components/ui/glowing-cards";
import {
  BarChart3,
  CalendarIcon,
  CheckCircle,
  ClockArrowDown,
  Crown,
  DollarSign,
  FileTextIcon,
  FolderArchiveIcon,
  Headphones,
  LockIcon,
  ServerIcon,
  Share2Icon,
  Star,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BecomeProviderPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const router = useRouter();
  const features = [
    {
      name: "Push to deploy.",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: ClockArrowDown,
    },
    {
      name: "SSL certificates.",
      description:
        "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
      icon: LockIcon,
    },
    {
      name: "Database backups.",
      description:
        "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
      icon: ServerIcon,
    },
  ];
  const proFeatures = [
    "Tot ce include planul gratuit",
    "Locatii multiple",
    "Vizibilitate prioritara in lista de furnizori",
    "Badge Pro pe profil",
    "Calendar de rezervari integrat",
    "5 poze pentru furnizor",
    "Connfigurare sectiune FAQ",
  ];

  const cards = [
    {
      icon: Users,
      title: "Clienți calificați",
      description:
        "Conectează-te cu miri care sunt cu adevărat interesați de serviciile tale.",
      className: "col-span-1 lg:col-span-1",
      background: (
        <GlowingCards
          enableGlow={true}
          glowRadius={30}
          glowOpacity={0.6}
          backgroundColor="#faf3fb"
        >
          <GlowingCard
            glowColor="#8b5cf6"
            hoverEffect={true}
            className="bg-transparent"
          >
            <div className="bg-transparent">
              <div className="text-center p-4">
                <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-800">500+</div>
                <div className="text-sm text-purple-600">Miri activi lunar</div>
              </div>
            </div>
          </GlowingCard>
        </GlowingCards>
      ),
    },
    {
      icon: Star,
      title: "Profil dedicat",
      description: `Afișează descrierea completă, fotografii, oferte și date de
                  contact pentru a atrage atenția mirilor.`,
      className: "col-span-1 lg:col-span-2",
      background: (
        <GlowingCards
          enableGlow={true}
          glowRadius={30}
          glowOpacity={0.6}
          backgroundColor="#fff7ed"
        >
          <GlowingCard
            glowColor="#f59e0b"
            hoverEffect={true}
            className="bg-transparent"
          >
            <div className="flex h-full w-full items-center justify-center bg-transparent rounded-lg">
              <div className="text-center">
                <FileTextIcon className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                  Profil dedicat brandului tău
                </h3>
                <p className="text-sm text-yellow-700 mb-3">
                  Prezintă-ți serviciile cu un profil complet personalizat
                </p>
              </div>
            </div>
          </GlowingCard>
        </GlowingCards>
      ),
    },
    {
      icon: Crown,
      title: "Poziționare premium",
      description:
        "Poți apărea în topul rezultatelor pentru mai multă vizibilitate în fața clienților potriviți.",
      className: "col-span-1 lg:col-span-2",
      background: (
        <GlowingCards
          enableGlow={true}
          glowRadius={30}
          glowOpacity={0.6}
          backgroundColor="#f0f9ff"
        >
          <GlowingCard
            glowColor="#3b82f6"
            hoverEffect={true}
            className="bg-transparent"
          >
            <div className="bg-transparent flex h-full w-full items-center justify-center rounded-lg">
              <div className="text-center">
                <Crown className="w-6 h-6  text-blue-500 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Poziționare premium
                </h3>
                <p className="text-sm text-blue-700">
                  Poți apărea în topul rezultatelor pentru mai multă
                  vizibilitate în fața clienților potriviți.
                </p>
              </div>
            </div>
          </GlowingCard>
        </GlowingCards>
      ),
    },
    {
      icon: DollarSign,
      title: "Creștere venituri",
      description:
        "Mărește-ți numărul de contracte prin expunere constantă în platformă.",
      className: "col-span-1 lg:col-span-1",
      background: (
        <GlowingCards
          enableGlow={true}
          glowRadius={30}
          glowOpacity={0.6}
          backgroundColor="#ecfdf5"
        >
          <GlowingCard
            glowColor="#10b981"
            hoverEffect={true}
            className="bg-transparent"
          >
            <div className="bg-transparent">
              <div className="text-center">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-green-800">+35%</div>
                <div className="text-sm text-green-600">
                  Creștere medie venituri
                </div>
              </div>
            </div>
          </GlowingCard>
        </GlowingCards>
      ),
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 pt-12">
      <div className=" relative max-w-4xl mx-auto min-h-screen">
        <div className="text-center mb-12">
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Devino Furnizor pe Planyvite Expo
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Promovează-ți serviciile acolo unde mirii te caută!
          </p>
        </div>

        <BentoGrid cards={cards} columns={3} className="mt-10" />

        <div className="text-center">
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white py-6 px-8 text-lg font-semibold mt-4"
            onClick={() => router.push("/login")}
          >
            Devino Furnizor Acum
          </Button>
        </div>
      </div>

      <div className="how-it-works-section relative bg-white py-16">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-pink-50/80 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto mt-16 px-4 ">
          <div className="text-center mb-12">
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl mb-4">
              Cum funcționează?
            </h2>
            <p className="text-lg text-gray-600">
              Este foarte simplu să devii furnizor pe Planyvite Expo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Îți faci cont
              </h3>
              <p className="text-gray-600">
                Creează-ți contul gratuit în câteva minute
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Completezi profilul
              </h3>
              <p className="text-gray-600">
                Adaugă informații despre serviciile tale și fotografii
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Apari în listă
              </h3>
              <p className="text-gray-600">
                Vei apărea în lista de furnizori și mirii te vor putea găsi
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-primary text-center md:text-left">
                  Completează profilul de furnizor
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl text-center md:text-left">
                  Arată-ți profesionalismul și atrage mai mulți clienți
                </p>
                <p className="mt-6 text-lg/8 text-gray-700 text-center md:text-left">
                  Completează-ți profilul pentru a oferi mirilor toate
                  informațiile necesare. Un profil bine pus la punct crește
                  încrederea și rata de conversie.
                </p>
                <ul className="mt-6 space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <strong className="text-indigo-600">1.</strong>
                    <span>
                      Descriere clară: explică serviciile, stilul și ce te
                      diferențiază.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <strong className="text-indigo-600">2.</strong>
                    <span>
                      Fotografii de calitate: încarcă 3–5 imagini
                      reprezentative.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <strong className="text-indigo-600">3.</strong>
                    <span>
                      Contact și locații: adaugă telefon, email și locațiile
                      unde lucrezi.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <strong className="text-indigo-600">4.</strong>
                    <span>
                      Pachete & prețuri: prezintă oferte clare și ce include
                      fiecare pachet.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <strong className="text-indigo-600">5.</strong>
                    <span>
                      Calendar: sincronizează-ți programul pentru rezervări
                      rapide.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <strong className="text-indigo-600">6.</strong>
                    <span>
                      Sfaturi rapide: folosește titluri concise, limbaj
                      profesionist și actualizează periodic.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <img
              alt="Product screenshot"
              src="/demo_img_dashboard.png"
              width={2432}
              height={1442}
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="benefits-section relative bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl text-center mb-4">
                Beneficiile de a fi furnizor pe Planyvite Expo
              </h2>
              <p className="text-lg text-gray-600">
                Descoperă avantajele platformei noastre
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-primary">
                <div className="text-primary mb-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Vizibilitate crescută
                </h3>
                <p className="text-gray-600">
                  Apari în fața a sute de miri care caută serviciile tale zilnic
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-primary">
                <div className="text-primary mb-3">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Clienți calificați
                </h3>
                <p className="text-gray-600">
                  Conectează-te doar cu miri care sunt cu adevărat interesați de
                  serviciile tale
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-primary">
                <div className="text-primary mb-3">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Recenzii și rating
                </h3>
                <p className="text-gray-600">
                  Construiește-ți reputația prin recenziile clienților mulțumiți
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-primary">
                <div className="text-primary mb-3">
                  <DollarSign className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Creștere venituri
                </h3>
                <p className="text-gray-600">
                  Mărește-ți numărul de contracte și veniturile prin expunere
                  constantă
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-primary">
                <div className="text-primary mb-3">
                  <Headphones className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Suport dedicat
                </h3>
                <p className="text-gray-600">
                  Beneficiezi de asistență tehnică și suport pentru optimizarea
                  profilului
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="pricing-section relative bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl text-center mb-4">
                Alege planul potrivit pentru tine
              </h2>
              <p className="text-lg text-gray-600">
                Deblocați toate funcționalitățile disponibile pe platforma
                noastră de furnizori
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
                      <CheckCircle className="h-4 w-4 text-green-500" />O
                      singura locatie
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
                  <div className="text-2xl font-bold">
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
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeProviderPage;
