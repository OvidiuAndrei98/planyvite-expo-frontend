import { setDoc, doc } from "firebase/firestore";
import db from "../../lib/firebase/fireStore";
import { User } from "@/core/types";
import { getDoc, updateDoc } from "firebase/firestore";

export const addUser = async (user: User): Promise<void> => {
  try {
    await setDoc(doc(db, "users/" + user.uid), user);
    // also create an empty provider document for this user
    const providerRef = doc(db, "providers/" + user.uid);
    const providerSnap = await getDoc(providerRef);
    if (!providerSnap.exists()) {
      await setDoc(providerRef, {
        uid: user.uid,
        generalSettings: {},
        packages: [],
      });
    }
  } catch (error) {
    console.error("Error adding the user:", error);
    throw error;
  }
};
