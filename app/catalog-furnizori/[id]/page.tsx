"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Globe,
  Instagram,
  Mail,
  MinusIcon,
  Phone,
  PlusIcon,
  Ticket,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownViewer from "@/components/markdown-viewer/MarkdownViewe";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { queryProviderByIdService } from "@/service/provider/queryProviderById";
import { Provider } from "@/core/types";
import { Spinner } from "@/components/ui/spinner";
import { EVENT_VENDOR_CATEGORIES } from "@/core/constants";

const Page = () => {
  const [providerLoading, setProviderLoading] = useState(true);
  const [provider, setProvider] = useState<Provider>();
  const { id } = useParams<{
    id: string;
  }>();

  const queryProviderById = async () => {
    setProviderLoading(true);
    const provider = await queryProviderByIdService(id);
    setProvider(provider);
    setProviderLoading(false);
  };

  useEffect(() => {
    queryProviderById();
  }, [id]);

  // Inject calendar embed code
  useEffect(() => {
    if (
      provider?.contactSettings?.calendar &&
      provider.providerPlan === "pro"
    ) {
      const calendarEmbedDiv = document.querySelector(".calendar-embed");
      if (calendarEmbedDiv) {
        // Clear existing content
        calendarEmbedDiv.innerHTML = "";

        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = provider.contactSettings.calendar || "";

        // Move all elements to the target div
        while (tempDiv.firstChild) {
          calendarEmbedDiv.appendChild(tempDiv.firstChild);
        }

        // Execute any script tags
        const scripts = calendarEmbedDiv.querySelectorAll("script");
        scripts.forEach((script) => {
          const newScript = document.createElement("script");
          if (script.src) {
            newScript.src = script.src;
          } else {
            newScript.textContent = script.textContent;
          }
          // Copy attributes
          Array.from(script.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });
          script.parentNode?.replaceChild(newScript, script);
        });
      }
    }
  }, [provider]);

  if (!provider || providerLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <Spinner color="#7b34f9" className="size-8" />
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
        <span className="font-medium">
          {provider.generalSettings.displayName}
        </span>
      </div>

      <div className="provider-header mb-6 w-full">
        <div className="flex flex-col gap-2 items-start md:flex-row md:gap-4 md:items-center">
          <h1 className="text-3xl font-bold">
            {provider.generalSettings.displayName}
          </h1>
          {provider.providerPlan === "pro" && (
            <span className="text-sm text-[#B46ACB] bg-[#F8E5FD] rounded-md px-2 py-1 font-medium">
              Pro
            </span>
          )}
        </div>
        <p className="text-muted-foreground mt-2">
          {EVENT_VENDOR_CATEGORIES.find(
            (cat) => cat.value === provider.generalSettings.category
          )?.label || "Categorie nedefinită"}
        </p>
      </div>

      {/* Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="provider-image w-full">
            <Carousel>
              <CarouselContent>
                {provider.generalSettings.images &&
                provider.generalSettings.images.length > 0 ? (
                  provider.providerPlan === "pro" ? (
                    provider.generalSettings.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <Image
                          src={image.src}
                          width={1024}
                          height={1024}
                          alt={`${provider.generalSettings.displayName} image ${
                            index + 1
                          }`}
                          className="w-full h-100 rounded-md object-cover"
                        />
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <Image
                        src={provider.generalSettings.images[0].src}
                        width={1024}
                        height={1024}
                        alt={`${
                          provider.generalSettings.displayName
                        } image ${1}`}
                        className="w-full h-100 rounded-md object-cover"
                      />
                    </CarouselItem>
                  )
                ) : (
                  <CarouselItem>
                    <Image
                      src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop"
                      width={1024}
                      height={1024}
                      alt="Placeholder image"
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </div>

          <div className="provider-details w-full bg-white p-6 rounded-md shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Detalii Furnizor</h3>
            <div className="text-base text-foreground mb-6">
              <MarkdownViewer content={provider.generalSettings.description} />
            </div>
          </div>

          {provider.contactSettings?.calendar &&
            provider.providerPlan === "pro" && (
              <div className="provider-calendar w-full bg-white p-6 rounded-md shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">
                  Programează o întâlnire online
                </h3>
                <div className="calendar-embed w-full"></div>
              </div>
            )}

          {provider.faqs &&
            provider.faqs.filter((faq) => faq.isActive).length > 0 && (
              <div className="provider-faq flex flex-col gap-4">
                <h3 className="text-2xl font-semibold mb-4">
                  Întrebări Frecvente
                </h3>
                {provider.faqs
                  .filter((faq) => faq.isActive)
                  .map((faq) => (
                    <FAQItem
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
              </div>
            )}
        </div>

        {/* Right Column - Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-[90px] flex flex-col gap-6">
            <div className="provider-contact w-full bg-white p-6 rounded-md shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">
                Informații de Contact
              </h3>
              <div className="contact-info flex flex-col gap-4">
                {provider.contactSettings?.phone && (
                  <ContactCard
                    provider={provider.contactSettings?.phone}
                    icon={<Phone />}
                  />
                )}
                {provider.contactSettings?.email && (
                  <ContactCard
                    provider={provider.contactSettings?.email}
                    icon={<Mail />}
                  />
                )}
                {provider.contactSettings?.website && (
                  <ContactCard
                    provider={"Website"}
                    clickable={true}
                    url={provider.contactSettings?.website}
                    icon={<Globe />}
                  />
                )}
                {provider.contactSettings?.instagram && (
                  <ContactCard
                    provider={"Instagram"}
                    clickable={true}
                    url={provider.contactSettings?.instagram}
                    icon={<Instagram />}
                  />
                )}
                {provider.contactSettings?.tiktok && (
                  <ContactCard
                    provider={"TikTok"}
                    clickable={true}
                    url={provider.contactSettings?.tiktok}
                    icon={<Ticket />}
                  />
                )}
                {!provider.contactSettings?.phone &&
                  !provider.contactSettings?.email &&
                  !provider.contactSettings?.website &&
                  !provider.contactSettings?.instagram &&
                  !provider.contactSettings?.tiktok && (
                    <div className="text-muted-foreground">
                      Nu sunt informații disponibile
                    </div>
                  )}
              </div>
            </div>
            {provider.packages &&
              provider.packages.filter((pkg) => pkg.isActive).length > 0 && (
                <div className="provider-packages w-full">
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
                          <TabsTrigger
                            key={index}
                            value={pkg.name}
                            className="flex-1"
                          >
                            {pkg.name}
                          </TabsTrigger>
                        ))
                      ) : (
                        <div>Niciun pachet disponibil.</div>
                      )}
                    </TabsList>
                    {provider.packages && provider.packages.length > 0 ? (
                      provider.packages.map((pkg: any, index: number) => (
                        <TabsContent key={index} value={pkg.name}>
                          <div className="package-card bg-white p-6 rounded-md shadow-sm max-h-[600px] overflow-y-auto">
                            <h4 className="text-xl font-semibold mb-2">
                              {pkg.name}
                            </h4>
                            <div className="mb-4">
                              <MarkdownViewer content={pkg.description} />
                            </div>
                            {Number.isFinite(pkg.price) &&
                              Number(pkg.price) > 0 && (
                                <span className="text-2xl font-bold">
                                  {pkg.price} {pkg.currency}
                                </span>
                              )}
                          </div>
                        </TabsContent>
                      ))
                    ) : (
                      <div>Niciun pachet disponibil.</div>
                    )}
                  </Tabs>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

const ContactCard = ({
  clickable = false,
  url,
  provider,
  icon,
}: {
  provider: any;
  icon: React.ReactNode;
  clickable?: boolean;
  url?: string;
}) => {
  return (
    <div
      className={`flex flex-row gap-4 bg-primary/5 border-1 border-primary p-2 rounded-md items-center ${
        clickable ? " cursor-pointer" : ""
      }`}
      onClick={clickable ? () => window.open(url, "_blank") : undefined}
    >
      <span className="min-w-5">{icon}</span>
      <span className="truncate">{provider}</span>
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
