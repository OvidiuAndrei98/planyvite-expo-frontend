"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { dummyProviders } from "../page";
import { Globe, Mail, MinusIcon, Phone, PlusIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownViewer from "@/components/markdown-viewer/MarkdownViewe";

const Page = () => {
  const [provider, setProvider] = useState<any>(null);
  const { id } = useParams<{
    id: string;
  }>();

  useEffect(() => {
    const foundProvider = dummyProviders.find((p) => p.id === Number(id));
    setProvider(foundProvider || null);
  }, [id]);
  if (!provider) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="provider max-w-[1024px] mx-auto p-[var(--padding-md)] h-full">
      <div className="breadcrumb">
        <Link href="/catalog-furnizori">
          <span className="text-muted-foreground">Catalog furnizori</span>
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="font-medium">{provider.name}</span>
      </div>
      <div className="provider-header mb-6 w-full">
        <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
        <p className="text-muted-foreground">{provider.category}</p>
      </div>
      <div className="provider-image mb-6 w-full">
        <Image
          src={provider.thumbnailPhoto}
          width={400}
          height={300}
          alt={provider.name}
          className="w-full h-auto rounded-md object-cover"
        />
      </div>
      <div className="provider-details w-full bg-white p-6 rounded-md shadow-sm mb-6">
        <h3 className="text-2xl font-semibold mb-4">Detalii Furnizor</h3>
        <p className="text-base text-foreground mb-6">
          {provider.descriptions}
        </p>
      </div>
      <div className="provider-packages w-full mb-6">
        <Tabs
          defaultValue={
            provider.packages && provider.packages.length > 0
              ? provider.packages[0].name
              : ""
          }
        >
          <TabsList>
            {provider.packages && provider.packages.length > 0 ? (
              provider.packages.map((pkg: any, index: number) => (
                <TabsTrigger key={index} value={pkg.name}>
                  {pkg.name}
                </TabsTrigger>
              ))
            ) : (
              <div>No packages available.</div>
            )}
          </TabsList>
          {provider.packages && provider.packages.length > 0 ? (
            provider.packages.map((pkg: any, index: number) => (
              <TabsContent key={index} value={pkg.name}>
                <div className="package-card bg-white p-2 rounded-md shadow-sm">
                  <h4 className="text-xl font-semibold mb-2">{pkg.name}</h4>
                  <div className="text-muted-foreground mb-4">
                    <MarkdownViewer content={pkg.shortDescription} />
                  </div>
                  <div className="mb-4">
                    <MarkdownViewer content={pkg.details} />
                  </div>
                  <span className="text-2xl font-bold">{pkg.price} Lei</span>
                </div>
              </TabsContent>
            ))
          ) : (
            <div>No packages available.</div>
          )}
        </Tabs>
      </div>
      <div className="provider-contact w-full bg-white p-6 rounded-md shadow-sm mb-6">
        <h3 className="text-2xl font-semibold mb-4">Informații de Contact</h3>
        <div className="contact-info flex flex-col gap-4">
          <ContactCard provider={provider.phone} icon={<Phone />} />
          <ContactCard provider={provider.email} icon={<Mail />} />
          <ContactCard provider={provider.website} icon={<Globe />} />
        </div>
      </div>
      <div className="provider-faq flex flex-col gap-4 mb-6">
        <h3 className="text-2xl font-semibold mb-4">Întrebări Frecvente</h3>
        <FAQItem
          question="Care sunt serviciile oferite?"
          answer="Oferim o gamă completă de servicii pentru evenimente, inclusiv decorațiuni, catering, sonorizare și iluminat profesional."
        />
        <FAQItem
          question="Cum pot face o rezervare?"
          answer="Puteți face o rezervare prin telefon, email sau prin intermediul site-ului nostru web. Echipa noastră vă va contacta în cel mai scurt timp."
        />
        <FAQItem
          question="Care este politica de anulare?"
          answer="Anulările făcute cu mai mult de 48 de ore înainte de eveniment nu implică costuri suplimentare. Pentru anulări în ultimele 48 de ore, se aplică o taxă de 25%."
        />
      </div>
      <div className="bg-primary/30 p-4 rounded">
        <h3 className="text-2xl font-semibold mb-4">Planyvite Expo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
      </div>
    </div>
  );
};

export default Page;

const ContactCard = ({
  provider,
  icon,
}: {
  provider: any;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row gap-4 bg-primary/5 border-1 border-primary p-2 rounded-md items-center">
      {icon} {provider}
    </div>
  );
};

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full flex-col gap-2 "
    >
      <div className="flex items-center justify-between gap-4 px-4 bg-white rounded-md py-2 shadow-sm">
        <h4 className="text-sm font-semibold">{question}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            {isOpen ? <MinusIcon className="rotate-180" /> : <PlusIcon />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="relative rounded-md px-4 py-2 text-sm bg-white shadow-sm border border-gray-200 before:content-[''] before:left-0 before:right-0 before:h-[30px] before:-top-[17px] before:absolute before:bg-white">
          {answer}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
