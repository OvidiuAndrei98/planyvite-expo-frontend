"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { use, useEffect, useRef, useState } from "react";
import Quill from "quill";
import QuillEditor from "@/components/quill-editor/Editor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/core/context/authContext";
import MultiSelect from "@/components/ui/multi-select";
import SortableImageUpload from "@/components/ui/sortable-image-upload";
import {
  saveImagesToFirestore,
  SortableImage,
} from "@/service/provider/saveImagesToFirestore";
import { EVENT_VENDOR_CATEGORIES, ROMANIA_LOCATIONS } from "@/core/constants";
import { Provider } from "@/core/types";
import { queryProviderByIdService } from "@/service/provider/queryProviderById";
import { updateProviderService } from "@/service/provider/updateProviderService";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

const ProviderSettingsPage: React.FC = () => {
  const user = useAuth().userDetails;
  //   const [providerDescription, setProviderDescription] = useState<string>("");
  //   const [providerDisplayName, setProviderDisplayName] = useState<string>("");
  //   const [providerImages, setProviderImages] = useState<SortableImage[]>([]);
  //   const [providerLocations, setProviderLocations] = useState<string[]>([]);
  //   const [providerCategory, setProviderCategory] = useState<string>("");
  const [isValidProvider, setIsValidProvider] = useState<boolean>(false);
  const [providerData, setProviderData] = useState<Provider | null>(null);
  const [providerLoading, setProviderLoading] = useState<boolean>(true);

  const quillRef = useRef<Quill | null>(null);

  const queryProviderById = async (providerId: string) => {
    setProviderLoading(true);
    const provider = await queryProviderByIdService(providerId);
    setProviderData(provider);
    if (provider?.generalSettings?.description) {
      // Initialize quill editor with description after provider data is set
      setTimeout(() => {
        if (quillRef.current) {
          quillRef.current.root.innerHTML =
            provider.generalSettings.description;
        }
      }, 100);
    }
    setProviderLoading(false);
  };

  const updateProviderProperty = (property: string, value: any) => {
    if (!providerData) return;

    // Handle nested property updates
    if (property.includes(".")) {
      const keys = property.split(".");
      const newData = { ...providerData };
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      setProviderData(newData);
    } else {
      setProviderData({ ...providerData, [property]: value });
    }
  };

  useEffect(() => {
    // Validate if provider has completed all required fields
    const validateProvider = () => {
      if (!providerData || !providerData.generalSettings) {
        setIsValidProvider(false);
        return;
      }

      const hasName =
        providerData?.generalSettings?.displayName &&
        providerData.generalSettings.displayName.trim() !== "";
      const hasCategory = !!providerData?.generalSettings?.category;
      const hasLocations =
        (providerData?.generalSettings?.locations?.length ?? 0) > 0;
      const hasDescription =
        providerData?.generalSettings?.description &&
        providerData.generalSettings.description.trim() !== "";
      const hasImages =
        (providerData?.generalSettings?.images?.length ?? 0) > 0;
      setIsValidProvider(
        !!(
          hasName &&
          hasCategory &&
          hasLocations &&
          hasDescription &&
          hasImages
        )
      );
    };

    validateProvider();
  }, [providerData]);

  useEffect(() => {
    queryProviderById(user?.uid || "");
  }, []);

  const saveProviderImagesToFirestore = async (images: SortableImage[]) => {
    if (!user) return;
    try {
      await saveImagesToFirestore(images, user.uid);
      console.log("Images saved successfully");
    } catch (error) {
      console.error("Error saving images:", error);
    }
  };

  const updateProvider = () => {
    if (!user || !providerData) return;

    const providerDataWithoutImages = {
      ...providerData,
      uid: user.uid,
      generalSettings: {
        ...providerData.generalSettings,
        images: undefined,
      },
    };
    updateProviderService(user.uid, providerDataWithoutImages);
  };

  return providerLoading ? (
    <div className="w-full h-full flex items-center justify-center bg-background">
      <Spinner color="#7b34f9" className="size-8" />
    </div>
  ) : (
    <div className="flex flex-col w-full h-full bg-background p-[var(--padding-sm)] overflow-auto gap-6">
      <div className="flex justify-end items-center max-w-[1024px] mx-auto w-full sticky top-0 z-20 rounded-md gap-4">
        <Button variant="default" onClick={updateProvider}>
          Salvează Setările
        </Button>
      </div>

      <div className="w-full bg-white rounded-md p-4 shadow-sm max-w-[1024px] mx-auto">
        {!isValidProvider && (
          <div className="p-4 bg-yellow-100/50 border-l-4 border-yellow-500 text-yellow-700 text-md rounded-md mb-4">
            <p>
              Pentru a activa profilul tău de furnizor, te rugăm să completezi
              toate câmpurile necesare din setările generale.
            </p>
          </div>
        )}
        <h1 className="text-2xl font-bold mb-1">Setări Generale</h1>
        <p>Aici poți gestiona setările contului tău de furnizor.</p>
        <FieldSet className="py-4">
          <FieldGroup>
            <Field orientation="responsive">
              <FieldContent className="max-w-[300px] flex-[1_1_100%]">
                <FieldLabel htmlFor="name">Nume</FieldLabel>
                <FieldDescription>
                  Numele care va fi afișat clienților tăi
                </FieldDescription>
              </FieldContent>
              <Input
                onChange={(e) => {
                  updateProviderProperty(
                    "generalSettings.displayName",
                    e.target.value
                  );
                }}
                value={providerData?.generalSettings?.displayName ?? ""}
                id="name"
                placeholder="Nume Furnizor"
                required
                className="!w-full"
              />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <FieldContent className="max-w-[300px] flex-[1_1_100%]">
                <FieldLabel htmlFor="name">Categorie</FieldLabel>
                <FieldDescription>
                  Categoria principală a serviciilor tale
                </FieldDescription>
              </FieldContent>
              <Select
                value={providerData?.generalSettings?.category || ""}
                onValueChange={(value) => {
                  updateProviderProperty("generalSettings.category", value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selectează categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {EVENT_VENDOR_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <FieldContent className="max-w-[300px] flex-[1_1_100%]">
                <FieldLabel htmlFor="name">Locație</FieldLabel>
                <FieldDescription>
                  Locația unde îți oferi serviciile
                </FieldDescription>
              </FieldContent>
              {user?.providerPlan === "pro" ? (
                <MultiSelect
                  options={ROMANIA_LOCATIONS}
                  value={providerData?.generalSettings?.locations || []}
                  onChange={(value) => {
                    updateProviderProperty("generalSettings.locations", value);
                  }}
                  placeholder="Selectează locațiile"
                />
              ) : (
                <Select
                  value={providerData?.generalSettings?.locations?.[0] || ""}
                  onValueChange={(value) => {
                    updateProviderProperty("generalSettings.locations", [
                      value,
                    ]);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selectează locația" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ROMANIA_LOCATIONS.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </Field>
            <FieldSeparator />
            <Field
              orientation="responsive"
              className="provider-description-field"
            >
              <FieldContent className="max-w-[300px] flex-[1_1_100%]">
                <FieldLabel htmlFor="lastName">Descriere</FieldLabel>
                <FieldDescription>
                  Descriere generala, aceasta va aparea pe profilul tau public
                </FieldDescription>
              </FieldContent>
              <QuillEditor
                ref={quillRef}
                onTextChange={() => {
                  const htmlContent = quillRef.current?.root.innerHTML;
                  updateProviderProperty(
                    "generalSettings.description",
                    htmlContent || ""
                  );
                }}
              />
            </Field>
            <Field
              orientation="responsive"
              className="provider-description-field"
            >
              <FieldContent className="max-w-[300px] flex-[1_1_100%]">
                <FieldLabel htmlFor="lastName">Galerie imagini</FieldLabel>
                <FieldDescription>
                  Adaugă imagini reprezentative pentru serviciile tale, prima va
                  fi imaginea principală afișată in lista de furnizori. <br />
                  Poti incarca până la 5 imagini(max 10MB fiecare in fromat
                  JPG/JPEG/PNG).
                </FieldDescription>
              </FieldContent>
              <SortableImageUpload
                maxFiles={user?.providerPlan === "pro" ? 5 : 1}
                path={user?.uid || "defaultUserId"}
                onSaveImages={(images) => {
                  saveProviderImagesToFirestore(images);
                }}
                defaultImages={providerData?.generalSettings?.images || []}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
      <div className="w-full bg-white rounded-md p-4 shadow-sm max-w-[1024px] mx-auto">
        <h1 className="text-2xl font-bold mb-1">Setări Pachete</h1>
        <p>Aici poți gestiona pachetele oferite de tine ca furnizor.</p>
        <div>
          <PackageManager
            providerId={user?.uid || ""}
            packages={providerData?.packages || []}
            onPackagesChange={(packages) => {
              updateProviderProperty("packages", packages);
            }}
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-md p-4 shadow-sm max-w-[1024px] mx-auto">
        <h1 className="text-2xl font-bold mb-1">
          Setări Informații de Contact
        </h1>
        <p>
          Gestionează informațiile tale de contact afișate pe profilul public.
        </p>
        <FieldSet className="py-4">
          <FieldGroup>
            <Field orientation="responsive">
              <FieldContent className="max-w-[300px] flex-[1_1_100%]">
                <FieldLabel htmlFor="phone">Telefon</FieldLabel>
                <FieldDescription>
                  Numărul tău de telefon pentru contact direct
                </FieldDescription>
              </FieldContent>
              <Input
                onChange={(e) => {
                  updateProviderProperty(
                    "contactSettings.phone",
                    e.target.value
                  );
                }}
                value={providerData?.contactSettings?.phone ?? ""}
                id="phone"
                placeholder="Număr de telefon"
                required
                className="!w-full"
              />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <FieldContent className="max-w-[300px] flex-[1_1_100%]">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldDescription>
                  Adresa ta de email pentru contact direct
                </FieldDescription>
              </FieldContent>
              <Input
                onChange={(e) => {
                  updateProviderProperty(
                    "contactSettings.email",
                    e.target.value
                  );
                }}
                value={providerData?.contactSettings?.email ?? ""}
                id="email"
                placeholder="Adresă de email"
                required
                className="!w-full"
              />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <FieldContent className="max-w-[300px] flex-[1_1_100%]">
                <FieldLabel htmlFor="website">Website</FieldLabel>
                <FieldDescription>Adresa site-ului tău web</FieldDescription>
              </FieldContent>
              <Input
                onChange={(e) => {
                  updateProviderProperty(
                    "contactSettings.website",
                    e.target.value
                  );
                }}
                value={providerData?.contactSettings?.website ?? ""}
                id="website"
                placeholder="Adresă site web"
                required
                className="!w-full"
              />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <FieldContent className="max-w-[300px] flex-[1_1_100%]">
                <FieldLabel htmlFor="instagram">Instagram</FieldLabel>
                <FieldDescription>
                  Link către profilul tău de Instagram
                </FieldDescription>
              </FieldContent>
              <Input
                onChange={(e) => {
                  updateProviderProperty(
                    "contactSettings.website",
                    e.target.value
                  );
                }}
                value={providerData?.contactSettings?.instagram ?? ""}
                id="instagram"
                placeholder="Link profil Instagram"
                required
                className="!w-full"
              />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <FieldContent className="max-w-[300px] flex-[1_1_100%]">
                <FieldLabel htmlFor="tiktok">Tiktok</FieldLabel>
                <FieldDescription>
                  Link către profilul tău de Tiktok
                </FieldDescription>
              </FieldContent>
              <Input
                onChange={(e) => {
                  updateProviderProperty(
                    "contactSettings.website",
                    e.target.value
                  );
                }}
                value={providerData?.contactSettings?.tiktok ?? ""}
                id="tiktok"
                placeholder="Link profil Tiktok"
                required
                className="!w-full"
              />
            </Field>

            <FieldSeparator />
            <Field orientation="responsive" className="relative">
              {user?.providerPlan !== "pro" && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xs rounded-md flex items-center justify-center z-10">
                  <div className="text-center p-4 bg-white rounded-lg shadow-lg border">
                    <h3 className="text-sm font-semibold mb-1">
                      Doar pentru Pro
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Calendarul de programări este disponibil doar pentru
                      utilizatorii cu planul Pro.
                    </p>
                    <Button variant="default" size="sm">
                      Upgrade la Pro
                    </Button>
                  </div>
                </div>
              )}
              <FieldContent className="max-w-[300px] flex-[1_1_100%]">
                <FieldLabel htmlFor="calendar">Calendar programări</FieldLabel>
                <FieldDescription>
                  Pentru a afisa calendarul de programari este necesar sa aveti
                  cont pe{" "}
                  <Link
                    href="https://calendly.com/"
                    target="_blank"
                    className="text-primary"
                  >
                    Calendly
                  </Link>{" "}
                  si sa introduceti link-ul aici.
                  <br />
                  Puteti folosi acest ghid pentru integrare:{" "}
                  <Link
                    className="text-primary"
                    href="https://help.calendly.com/hc/en-us/articles/223147027-How-to-share-your-Calendly-link"
                    target="_blank"
                  >
                    aici
                  </Link>
                  , este necesar sa folositi link-ul de tip 'Inline Embed.'
                </FieldDescription>
              </FieldContent>
              <Input
                onChange={(e) => {
                  if (user?.providerPlan !== "pro") return;
                  updateProviderProperty(
                    "contactSettings.calendar",
                    e.target.value
                  );
                }}
                value={providerData?.contactSettings?.calendar ?? ""}
                id="calendar"
                placeholder="Embed Calendly"
                required
                className="!w-full"
                disabled={user?.providerPlan !== "pro"}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
      <div className="w-full bg-white rounded-md p-4 shadow-sm max-w-[1024px] mx-auto relative">
        {user?.providerPlan !== "pro" && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs rounded-md flex items-center justify-center z-10">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border">
              <h3 className="text-lg font-semibold mb-2">Doar pentru Pro</h3>
              <p className="text-gray-600 mb-4">
                Secțiunea FAQ este disponibilă doar pentru utilizatorii cu
                planul Pro.
              </p>
              <Button variant="default">Upgrade la Pro</Button>
            </div>
          </div>
        )}
        <h1 className="text-2xl font-bold mb-1">Setări Sectiune FAQ</h1>
        <p>Aici poți gestiona întrebările frecvente afișate pe profilul tău</p>
        <div>
          <FAQManager
            isPro={user?.providerPlan === "pro"}
            faqs={providerData?.faqs || []}
            onFaqsChange={(faqs) => {
              updateProviderProperty("faqs", faqs);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProviderSettingsPage;

const PackageManager = ({
  packages,
  onPackagesChange,
}: {
  providerId: string;
  packages: any[];
  onPackagesChange: (packages: any[]) => void;
}) => {
  const quillRef = useRef<Quill | null>(null);
  // Package management logic here (add, edit, delete packages)
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Pachetele tale</h3>
        <Button
          onClick={() => {
            const newPackage = {
              id: Date.now().toString(),
              name: "",
              description: "",
              price: 0,
              currency: "RON",
              isActive: true,
            };
            onPackagesChange([...packages, newPackage]);
          }}
          variant="outline"
        >
          Adaugă Pachet
        </Button>
      </div>

      {packages.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Nu ai încă pachete create.</p>
          <p className="text-sm">
            Creează primul tău pachet pentru a începe să primești cereri.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {packages.map((pkg, index) => (
            <div key={pkg.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Pachet #{index + 1}</h4>
                <Button
                  onClick={() => {
                    const updatedPackages = packages.filter(
                      (_, i) => i !== index
                    );
                    onPackagesChange(updatedPackages);
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  Șterge
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nume Pachet
                  </label>
                  <Input
                    value={pkg.name || ""}
                    onChange={(e) => {
                      const updatedPackages = [...packages];
                      updatedPackages[index] = { ...pkg, name: e.target.value };
                      onPackagesChange(updatedPackages);
                    }}
                    placeholder="ex: Pachet Standard"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Preț</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={pkg.price || ""}
                      onChange={(e) => {
                        const updatedPackages = [...packages];
                        updatedPackages[index] = {
                          ...pkg,
                          price: Number(e.target.value),
                        };
                        onPackagesChange(updatedPackages);
                      }}
                      placeholder="0"
                    />
                    <Select
                      value={pkg.currency || "RON"}
                      onValueChange={(value) => {
                        const updatedPackages = [...packages];
                        updatedPackages[index] = { ...pkg, currency: value };
                        onPackagesChange(updatedPackages);
                      }}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RON">RON</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <PackageDescriptionEditor
                defaultValue={pkg.description || ""}
                onChange={(description) => {
                  const updatedPackages = [...packages];
                  updatedPackages[index] = {
                    ...pkg,
                    description,
                  };
                  onPackagesChange(updatedPackages);
                }}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`active-${index}`}
                  checked={pkg.isActive !== false}
                  onChange={(e) => {
                    const updatedPackages = [...packages];
                    updatedPackages[index] = {
                      ...pkg,
                      isActive: e.target.checked,
                    };
                    onPackagesChange(updatedPackages);
                  }}
                  className="rounded"
                />
                <label htmlFor={`active-${index}`} className="text-sm">
                  Pachet activ (vizibil pentru clienți)
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PackageDescriptionEditor = ({
  defaultValue,
  onChange,
}: {
  defaultValue: string;
  onChange: (value: string) => void;
}) => {
  const quillRef = useRef<Quill | null>(null);
  useEffect(() => {
    // Initialize quill editor with description after component mounts
    setTimeout(() => {
      if (quillRef.current) {
        quillRef.current.root.innerHTML = defaultValue;
      }
    }, 100);
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Descriere Pachet</label>
      <QuillEditor
        ref={quillRef}
        onTextChange={() => {
          const htmlContent = quillRef.current?.root.innerHTML;
          onChange(htmlContent || "");
        }}
      />
    </div>
  );
};

const FAQManager = ({
  faqs,
  onFaqsChange,
  isPro,
}: {
  faqs: any[];
  onFaqsChange: (faqs: any[]) => void;
  isPro: boolean;
}) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Întrebările tale frecvente</h3>
        <Button
          onClick={() => {
            if (!isPro) {
              alert(
                "Funcționalitatea este disponibilă doar pentru planul Pro."
              );
              return;
            }
            const newFaq = {
              id: Date.now().toString(),
              question: "",
              answer: "",
              isActive: true,
            };
            onFaqsChange([...faqs, newFaq]);
          }}
          variant="outline"
        >
          Adaugă Întrebare
        </Button>
      </div>

      {faqs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Nu ai încă întrebări frecvente create.</p>
          <p className="text-sm">
            Creează prima întrebare pentru a ajuta clienții să înțeleagă mai
            bine serviciile tale.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Întrebare #{index + 1}</h4>
                <Button
                  onClick={() => {
                    const updatedFaqs = faqs.filter((_, i) => i !== index);
                    onFaqsChange(updatedFaqs);
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  Șterge
                </Button>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Întrebare
                  </label>
                  <Input
                    value={faq.question || ""}
                    onChange={(e) => {
                      const updatedFaqs = [...faqs];
                      updatedFaqs[index] = {
                        ...faq,
                        question: e.target.value,
                      };
                      onFaqsChange(updatedFaqs);
                    }}
                    placeholder="ex: Care sunt tarifele pentru serviciile voastre?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Răspuns
                  </label>
                  <Textarea
                    value={faq.answer || ""}
                    onChange={(e) => {
                      const updatedFaqs = [...faqs];
                      updatedFaqs[index] = {
                        ...faq,
                        answer: e.target.value,
                      };
                      onFaqsChange(updatedFaqs);
                    }}
                    placeholder="ex: Tarifele noastre variază în funcție de serviciu..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`faq-active-${index}`}
                  checked={faq.isActive !== false}
                  onChange={(e) => {
                    const updatedFaqs = [...faqs];
                    updatedFaqs[index] = {
                      ...faq,
                      isActive: e.target.checked,
                    };
                    onFaqsChange(updatedFaqs);
                  }}
                  className="rounded"
                />
                <label htmlFor={`faq-active-${index}`} className="text-sm">
                  Întrebare activă (vizibilă pentru clienți)
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
