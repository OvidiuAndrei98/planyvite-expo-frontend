import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  doc,
  getDoc,
} from "firebase/firestore";
import db from "../../lib/firebase/fireStore";
import { Provider } from "@/core/types";

export const queryProviderByIdService = async (
  providerId: string
): Promise<Provider> => {
  try {
    let providerData: DocumentData = {};
    const docRef = doc(db, "providers", providerId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      providerData = docSnap.data();
    } else {
      throw new Error("Provider not found");
    }

    return providerData as Provider;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};
