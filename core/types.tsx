import { SortableImage } from "@/service/provider/saveImagesToFirestore";

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  providerPlan?: "free" | "pro";
}

export interface Provider {
  uid: string;
  providerPlan?: "free" | "pro";
  isValidProvider: boolean;
  generalSettings: {
    displayName: string;
    images?: SortableImage[];
    category: string;
    locations: string[];
    description: string;
  };
  packages?: {
    description: string;
    name: string;
    price: number;
    currency: string;
  }[];
  contactSettings: {
    phone: string;
    email: string;
    website: string;
    instagram: string;
    tiktok: string;
    calendar: string;
  };
  faqs?: {
    id: string;
    question: string;
    answer: string;
    isActive: boolean;
  }[];
}

export interface PlanyviteInvoice {
  id: string;
  customerName: string;
  issueDate: string;
  invoiceLink: string;
  amount: number;
  invoiceNumber: string;
  collected: string;
  cancelled: string;
  stornoed: string;
  storno: string;
}
