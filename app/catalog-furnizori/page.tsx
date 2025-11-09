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
import { Slider } from "@/components/ui/slider";
import { FilterIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const dummyProviders = [
  {
    id: 1,
    name: "Furnizor 1",
    phone: "0712345678",
    email: "furnizor1@example.com",
    website: "www.furnizor1.ro",
    thumbnailPhoto:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    category: "Catering",
    location: "București",
    startPrice: 5000,
    descriptions:
      "Oferim servicii de catering de înaltă calitate pentru evenimente speciale.",
    // details: "Meniu personalizabil și servicii profesionale.",
    packages: [
      {
        name: "Pachet Standard",
        price: 5000,
        details: "Include aperitive, feluri principale și deserturi.",
      },
      {
        name: "Pachet Premium",
        price: 8000,
        details:
          "Include aperitive gourmet, feluri principale sofisticate și deserturi fine.",
      },
    ],
  },
  {
    id: 2,
    name: "Furnizor 2",
    category: "Decoratiuni",
    location: "București",
    startPrice: 3000,
    phone: "0723456789",
    email: "furnizor2@example.com",
    website: "www.furnizor2.ro",
    thumbnailPhoto:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    descriptions:
      "Transformăm spațiul evenimentului tău cu decorațiuni elegante și tematice.",
    packages: [
      {
        name: "Pachet Basic",
        price: 3000,
        details: "Include aranjamente florale și decorațiuni de masă.",
      },
      {
        name: "Pachet Deluxe",
        price: 6000,
        details:
          "Include aranjamente florale, decorațiuni de masă și decoruri tematice complete.",
      },
    ],
  },
];

export default function Catalog() {
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

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
          {dummyProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-card rounded-lg border shadow-sm overflow-hidden mb-4"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={provider.thumbnailPhoto}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2">{provider.name}</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  {provider.descriptions}
                </p>
                <Link href={`/catalog-furnizori/${provider.id}`}>
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
