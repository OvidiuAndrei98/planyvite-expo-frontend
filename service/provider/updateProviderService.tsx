import { Provider } from "@/core/types";
import db from "@/lib/firebase/fireStore";
import { doc, setDoc } from "firebase/firestore";

export const updateProviderService = async (
  providerId: string,
  providerData: Partial<Provider>
): Promise<void> => {
  try {
    const docRef = doc(db, `providers/${providerId}`);
    await setDoc(docRef, providerData, { merge: true });
  } catch (error) {
    console.error("Error saving images to Firestore:", error);
    throw error;
  }
};
