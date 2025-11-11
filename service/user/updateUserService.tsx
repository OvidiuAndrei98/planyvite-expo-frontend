import { User } from "@/core/types";
import db from "@/lib/firebase/fireStore";
import { doc, setDoc } from "firebase/firestore";

export const updateUserService = async (user: User): Promise<void> => {
  try {
    const docRef = doc(db, `users/${user.uid}`);
    await setDoc(docRef, user, { merge: true });
  } catch (error) {
    console.error("Error saving images to Firestore:", error);
    throw error;
  }
};
