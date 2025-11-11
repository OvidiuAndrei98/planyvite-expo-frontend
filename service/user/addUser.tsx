import { setDoc, doc } from "firebase/firestore";
import db from "../../lib/firebase/fireStore";
import { User } from "@/core/types";
import { getDoc, updateDoc } from "firebase/firestore";

export const addUser = async (user: User): Promise<void> => {
  try {
    // const customerRef = doc(db, "customers/" + user.uid);
    // const customerSnap = await getDoc(customerRef);

    // if (customerSnap.exists()) {
    //   await updateDoc(customerRef, { email: user.email });
    // }

    await setDoc(doc(db, "users/" + user.uid), user);
  } catch (error) {
    console.error("Error adding the user:", error);
    throw error;
  }
};
