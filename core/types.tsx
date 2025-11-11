import { SortableImage } from "@/service/provider/saveImagesToFirestore";

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  providerPlan: "free" | "pro";
}

export interface Provider {
  uid: string;
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
}
