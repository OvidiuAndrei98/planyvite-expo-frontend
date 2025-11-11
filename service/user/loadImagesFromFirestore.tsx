import db from "@/lib/firebase/fireStore";
import { doc, getDoc } from "firebase/firestore";

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  type: string;
}

export async function loadImagesFromFirestore(
  userId: string
): Promise<ImageData[]> {
  try {
    const docRef = doc(db, `users/${userId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.images.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        type: img.type,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error loading images from Firestore:", error);
    throw error;
  }
}
