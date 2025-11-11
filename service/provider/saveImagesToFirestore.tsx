import db from "@/lib/firebase/fireStore";
import { doc, setDoc } from "firebase/firestore";

export interface SortableImage {
  id: string;
  src: string;
  alt: string;
  type: "default" | "uploaded";
}

export const saveImagesToFirestore = async (
  images: SortableImage[],
  userId: string
): Promise<void> => {
  try {
    const docRef = doc(db, `providers/${userId}`);
    await setDoc(
      docRef,
      {
        generalSettings: {
          images: images.map((img, index) => ({
            id: img.id,
            src: img.src,
            alt: img.alt,
            type: img.type,
            order: index,
          })),
        },
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error saving images to Firestore:", error);
    throw error;
  }
};
