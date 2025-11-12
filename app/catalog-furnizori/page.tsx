"use client";

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
import { Spinner } from "@/components/ui/spinner";
import { EVENT_VENDOR_CATEGORIES, ROMANIA_LOCATIONS } from "@/core/constants";
import { Provider } from "@/core/types";
import { useIsMobile } from "@/hooks/isMobile";
import { queryProvidersService } from "@/service/provider/queryProviders";
import { FilterIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Catalog() {
  // const [priceRange, setPriceRange] = useState([0, 20000]);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [providersLoading, setProvidersLoading] = useState(false);
  const isMobile = useIsMobile();

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

  const hasActiveFilters = location !== "" || category !== "";
  // priceRange[0] !== 0 ||
  // priceRange[1] !== 20000;

  const resetFilters = () => {
    setLocation("");
    setCategory("");
    // setPriceRange([0, 20000]);
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
  }, [location, category]);

  return providersLoading ? (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <Spinner color="#7b34f9" className="size-8" />
    </div>
  ) : (
    <div className="min-h-screen grid grid-cols-1 grid-rows-[auto_1fr] max-w-[1024px] mx-auto px-[var(--padding-md)] py-[var(--padding-lg)] justify-center items-start overflow-auto">
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
            {isMobile ? (
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
                          {ROMANIA_LOCATIONS.map((loc) => (
                            <SelectItem key={loc.value} value={loc.value}>
                              {loc.label}
                            </SelectItem>
                          ))}
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
                          {EVENT_VENDOR_CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* <div className="price-range flex w-full max-w-md flex-col gap-3">
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
                  </div> */}
                  </div>
                </DrawerContent>
              </Drawer>
            ) : (
              <div className="flex flex-row gap-4 min-w-[300px]">
                <div className="city-filter flex w-full max-w-md flex-col gap-3">
                  <Select onValueChange={setLocation} value={location}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Locație.." />
                    </SelectTrigger>
                    <SelectContent>
                      {ROMANIA_LOCATIONS.map((loc) => (
                        <SelectItem key={loc.value} value={loc.value}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="city-filter flex w-full max-w-md flex-col gap-3">
                  <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Categorie.." />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_VENDOR_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <Button
              variant="link"
              className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={resetFilters}
            >
              Resetează filtrele
            </Button>
          </div>
        </div>
        <div className="providers-section w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {providers
            .sort((a, b) => {
              // Show pro providers first
              if (a.providerPlan === "pro" && b.providerPlan !== "pro")
                return -1;
              if (a.providerPlan !== "pro" && b.providerPlan === "pro")
                return 1;
              return 0;
            })
            .filter((provider) => provider.isValidProvider)
            .filter((provider) => {
              // Apply location filter
              if (
                location &&
                !provider.generalSettings.locations.includes(location)
              ) {
                return false;
              }
              // Apply category filter
              if (category && provider.generalSettings.category !== category) {
                return false;
              }
              return true;
            })
            .map((provider) => (
              <div
                key={provider.uid}
                className="bg-card rounded-lg border shadow-sm overflow-hidden mb-4 grid grid-rows-[auto_1fr_auto]"
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
                <div className="p-4 flex flex-col">
                  <h4 className="font-semibold text-lg mb-2">
                    {provider.generalSettings.displayName}
                    {provider.providerPlan === "pro" && (
                      <span className="ml-2 text-xs text-[#B46ACB] bg-[#F8E5FD] rounded-md px-2 py-1 font-medium">
                        Pro
                      </span>
                    )}
                  </h4>
                  <div className="text-muted-foreground text-sm mb-4 relative overflow-hidden">
                    <div className="line-clamp-5">
                      {provider.generalSettings.description
                        .replace(/<[^>]*>/g, " ")
                        .trim()
                        .slice(0, 350)}
                      ...
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-0">
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
