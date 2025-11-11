"use client";

import MarkdownViewer from "@/components/markdown-viewer/MarkdownViewe";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Provider } from "@/core/types";
import { queryProvidersService } from "@/service/provider/queryProviders";
import { FilterIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const dummyProviders = [
  {
    id: 1,
    name: "Elegant Catering Solutions",
    phone: "0712345678",
    email: "contact@code-lab.ro",
    website: "www.elegantcatering.ro",
    thumbnailPhoto:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    category: "Catering",
    location: "București",
    startPrice: 5000,
    descriptions: `# Despre Noi

Oferim **servicii de catering de înaltă calitate** pentru evenimente speciale cu o experiență de peste 15 ani în domeniu.

## Servicii Oferite

- Catering pentru nunți și botezuri
- Evenimente corporate și conferințe
- Petreceri private și aniversări
- Servicii de bartending profesional

### Ce Ne Diferențiază

* **Ingrediente fresh** - utilizăm doar ingrediente proaspete și de calitate
* **Echipă profesională** - bucătari cu experiență și servire impecabilă
* **Meniu personalizabil** - adaptăm meniul după preferințele tale
* **Prețuri competitive** - raport calitate-preț excelent

> *"Fiecare eveniment este unic, iar noi ne asigurăm că gustul rămâne de neuitat!"*`,
    packages: [
      {
        name: "Pachet Standard",
        price: 5000,
        details: `## Pachet Standard

**Include:**
- Aperitive reci (5 sortimente)
- Felul principal (2 opțiuni la alegere)
- Garnitură și salate
- Desert clasic
- Băuturi non-alcoolice

**Perfect pentru:** Evenimente de 50-80 persoane`,
      },
      {
        name: "Pachet Premium",
        price: 8000,
        details: `## Pachet Premium

**Include:**
- Aperitive gourmet (8 sortimente)
- Aperitive calde (3 sortimente)
- Felul principal (3 opțiuni premium)
- Garnituri sofisticate
- Desert fin cu prezentare specială
- Băuturi alcoolice și non-alcoolice
- Serviciu de bartending

**Bonus:** Decorare gratuită a meselor

**Perfect pentru:** Evenimente de lux, 80-150 persoane`,
      },
    ],
  },
  {
    id: 2,
    name: "Floral Dreams Decorations",
    category: "Decoratiuni",
    location: "București",
    startPrice: 3000,
    phone: "0723456789",
    email: "hello@floraldreams.ro",
    website: "www.floraldreams.ro",
    thumbnailPhoto:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    descriptions: `# Floral Dreams Decorations

## Transformăm Visurile în Realitate

Cu o **pasiune pentru frumos** și atenție la detalii, transformăm spațiul evenimentului tău cu decorațiuni elegante și tematice.

### Specializări

#### Nunți de Vis
- Aranjamente florale personalizate
- Arcade și fundal pentru ceremonie
- Decorațiuni pentru sală de recepție
- Centerpiece-uri elegante

#### Evenimente Corporate
- Decoruri profesionale și moderne
- Branding personalizat
- Amenajări spații de networking

#### Petreceri Tematice
- **Vintage** - decoruri retro și romantice
- **Modern** - linii clean și minimaliste
- **Rustic** - elemente naturale și călduroase
- **Glamour** - cristale și accente aurii

### De Ce Să Ne Alegi?

1. **Experiență** - 10+ ani în industrie
2. **Creativitate** - concepte unice pentru fiecare eveniment
3. **Calitate** - materiale premium și finisaje impecabile
4. **Punctualitate** - respectăm întotdeauna deadlineurile

> *"Fiecare petală, fiecare lumină, fiecare detaliu contează în crearea momentelor perfecte."*`,
    packages: [
      {
        name: "Pachet Basic",
        price: 3000,
        details: `## Pachet Basic - "Eleganța Simplă"

### Ce Include:

**Aranjamente Florale**
- 6 centerpiece-uri pentru mese
- Buchet mireasa (dacă aplicabil)
- 2 aranjamente laterale pentru scenă

**Decorațiuni de Masă**
- Fețe de masă elegante
- Lumânări decorative
- Suporturi pentru carduri

**Extra**
- Consultație gratuită
- Transport și montaj inclus

*Ideal pentru evenimente de 50-80 persoane*`,
      },
      {
        name: "Pachet Deluxe",
        price: 6000,
        details: `## Pachet Deluxe - "Magia Completă"

### Ce Include:

**Decoruri Complete**
- **Intrare:** Arcada florală cu bannere personalizate
- **Ceremonie:** Fundal decorativ și covor roșu
- **Recepție:** Decorare completă sală

**Aranjamente Premium**
- 12 centerpiece-uri luxoase
- Aranjamente suspendate
- Instalații de lumină decorativă
- Decorațiuni personalizate pentru tortul evenimentului

**Servicii Incluse**
- Design concept personalizat
- Montaj și demontaj complet
- Coordonator dedicat pentru eveniment
- Fotografii profesionale ale decorurilor

**Bonus**
- 🎁 Aranjament floral cadou pentru gazdă
- 📸 Album foto cu decorurile realizate

*Perfect pentru evenimente de lux, 100-200 persoane*`,
      },
    ],
  },
  {
    id: 3,
    name: "SoundWave Entertainment",
    category: "Muzica & Entertainment",
    location: "Cluj-Napoca",
    startPrice: 2500,
    phone: "0734567890",
    email: "bookings@soundwave.ro",
    website: "www.soundwaveentertainment.ro",
    thumbnailPhoto:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    descriptions: `# SoundWave Entertainment

## Aducem Muzica La Viața Ta! 🎵

Cu **tehnologie de ultimă generație** și artiști profesioniști, garantăm că evenimentul tău va avea banda sonoră perfectă.

### Servicii Complete

#### DJ Profesionist
- **Echipament premium:** Pioneer CDJ și mixer profesional
- **Biblioteca muzicală vastă:** peste 50.000 de piese
- **Mixing live:** adaptare în timp real la atmosfera petrecerii
- **Sistem de lumini:** sincronizat cu muzica

#### Formații Live
- **Cover Band:** cele mai iubite hituri
- **Jazz & Blues:** pentru evenimente elegante
- **Folk & Tradițional:** pentru evenimente autentice românești
- **Acoustic Duo:** pentru momente intime

#### Tehnologie Avansată

| Echipament | Specificații |
|------------|-------------|
| **Boxe** | Line Array profesional, 2000W |
| **Mixer** | Pioneer DJM-900NXS2 |
| **Microfoane** | Shure SM58, wireless |
| **Lumini** | LED Moving Heads, Laser Show |

### Experiențe Speciale

- 🎤 **Karaoke interactiv** pentru petreceri
- 🎪 **Show de lumini sincronizat** cu muzica
- 🕺 **Animatori profesioniști** pentru evenimente cu copii
- 🎭 **Spectacole tematice** personalizate

> *"Muzica nu este doar sunet - este emoție, este amintire, este viața petrecerii!"*`,
    packages: [
      {
        name: "Pachet DJ Standard",
        price: 2500,
        details: `## Pachet DJ Standard - "Party Vibes" 🎧

### Equipment Inclus

**Audio**
- Sistem sonorizare profesional (până la 150 persoane)
- DJ mixer Pioneer
- 2 microfoane wireless
- Laptop backup cu playlist-uri

**Lumini**
- Par LED RGB (6 bucăți)
- Efecte de lumină stroboscopică
- Mașină de fum

**Servicii**
- DJ profesionist (6 ore)
- Consultație pre-eveniment pentru playlist
- Anunțuri și prezentări speciale
- Transport și setup complet

**Genuri Muzicale**
- House & Electronic
- Pop & Rock internațional
- Muzică românească
- Oldies & Classics

*Perfect pentru petreceri private, aniversări, evenimente corporate*`,
      },
      {
        name: "Pachet Premium Live",
        price: 5500,
        details: `## Pachet Premium Live - "Full Experience" 🎸

### Formația Live (3-4 membri)

**Instrumentiști**
- Vocalist principal
- Chitarist/Backing vocals
- Basist
- Drummer

**Repertoriu Diversificat**
- **Românesc:** Voltaj, Holograf, Phoenix, Iris
- **Internațional:** Queen, Beatles, Bon Jovi, Coldplay
- **Petrecere:** piese de dans și party
- **Lent:** piese pentru deschiderea dansului

### Echipament Professional

**Audio Premium**
- Line Array sistem (până la 300 persoane)
- Mixer digital 32 canale
- In-ear monitoring pentru artiști
- Subwoofer pentru bass profund

**Stage & Lights**
- Scenă modulară (6x4m)
- Moving Head LED (12 bucăți)
- Backdrop personalizat cu logo-ul evenimentului
- Mașină de fum greu + ventilator

**Extra Services**
- 🎵 DJ set între pauze (2 ore)
- 🎤 Karaoke session pentru invitați
- 📹 Înregistrare live a momentelor speciale
- 🎁 CD personalizat cu piese interpretate live

**Program Complet**
- Setup: 2 ore
- Soundcheck: 30 min
- Performance: 4 ore (cu pauze)
- Encore la cererea publicului

*Ideal pentru nunți, eventos majore, lansări de produse*`,
      },
    ],
  },
];

export default function Catalog() {
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [providersLoading, setProvidersLoading] = useState(false);

  const queryProviders = async () => {
    // TODO: Implement API call to fetch providers based on filters
    setProvidersLoading(true);
    const providers = await queryProvidersService();
    setProviders(providers);
    setProvidersLoading(false);
  };

  // Initial fetch of providers
  useEffect(() => {
    queryProviders();
  }, []);

  const hasActiveFilters =
    location !== "" ||
    category !== "" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 20000;

  const resetFilters = () => {
    setLocation("");
    setCategory("");
    setPriceRange([0, 20000]);
  };

  useEffect(() => {
    // Log current filter values for debugging
    // console.log('Filters changed:', { priceRange, location, category });
    // Here you could add API calls to fetch filtered providers
    // Example:
    // const fetchProviders = async () => {
    //   const params = new URLSearchParams();
    //   if (location) params.append('location', location);
    //   if (category) params.append('category', category);
    //   params.append('minPrice', priceRange[0].toString());
    //   params.append('maxPrice', priceRange[1].toString());
    //
    //   try {
    //     const response = await fetch(`/api/providers?${params}`);
    //     const data = await response.json();
    //     setProviders(data);
    //   } catch (error) {
    //     console.error('Failed to fetch providers:', error);
    //   }
    // };
    //
    // fetchProviders();
  }, [priceRange, location, category]);

  return (
    <div className="grid grid-cols-1 max-w-[1024px] mx-auto px-[var(--padding-md)] py-[var(--padding-lg)] justify-center">
      <div className="header-section w-full flex flex-col gap-2 mb-8">
        <h3 className="text-center text-2xl font-semibold">
          Catalog Furnizori
        </h3>
        <span className="text-center text-muted-foreground">
          Găsește furnizorii de care ai nevoie pentru evenimentul tău
        </span>
      </div>
      <div className="content-section w-full">
        <div className="filters-section w-full mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  className={
                    hasActiveFilters ? "text-primary bg-primary/10" : ""
                  }
                >
                  <FilterIcon />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerTitle></DrawerTitle>
                <div className="mx-auto w-full max-w-sm p-[var(--padding-md)] flex flex-col gap-6">
                  <div className="city-filter flex w-full max-w-md flex-col gap-3">
                    <Label>Locație</Label>
                    <Select onValueChange={setLocation} value={location}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Locație.." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="city-filter flex w-full max-w-md flex-col gap-3">
                    <Label>Categorie</Label>
                    <Select onValueChange={setCategory} value={category}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Categorie.." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="price-range flex w-full max-w-md flex-col gap-3">
                    <Label htmlFor="slider">Preț</Label>
                    <Slider
                      id="slider"
                      max={20000}
                      min={0}
                      onValueChange={setPriceRange}
                      value={priceRange}
                    />
                    <div className="flex items-center justify-between text-muted-foreground text-sm">
                      <span>Lei {priceRange[0]}</span>
                      <span>Lei {priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
            <Button
              variant="link"
              className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={resetFilters}
            >
              Resetează filtrele
            </Button>
          </div>
        </div>
        <div className="providers-section">
          {providers.map((provider) => (
            <div
              key={provider.uid}
              className="bg-card rounded-lg border shadow-sm overflow-hidden mb-4"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={
                    provider.generalSettings.images?.[0]?.src ||
                    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop"
                  }
                  alt={provider.generalSettings.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2">
                  {provider.generalSettings.displayName}
                </h4>
                <div className="text-muted-foreground text-sm mb-4 relative overflow-hidden">
                  <MarkdownViewer
                    content={
                      provider.generalSettings.description.slice(0, 250) + "..."
                    }
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent pointer-events-none"></div>
                </div>
                <Link href={`/catalog-furnizori/${provider.uid}`}>
                  <Button variant="default" className="w-full">
                    Vezi Detalii
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
