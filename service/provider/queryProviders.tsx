import { collection, query, getDocs } from "firebase/firestore";
import db from "../../lib/firebase/fireStore";
import { Provider } from "@/core/types";

export const queryProvidersService = async (): Promise<Provider[]> => {
  try {
    const providers: Provider[] = [];
    const q = query(collection(db, "providers"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      providers.push(doc.data() as Provider);
    });

    return providers;
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw error;
  }
};
