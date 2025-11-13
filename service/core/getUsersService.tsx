import { collection, query, getDocs, DocumentData } from "firebase/firestore";
import db from "../../lib/firebase/fireStore";
import { User } from "@/core/types";
import { firebaseAuth } from "@/lib/firebase/firebaseConfig";

export const queryUsersService = async (): Promise<User[]> => {
  try {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const tokenResult = await currentUser.getIdTokenResult();
    if (!(tokenResult.claims.admin === true)) {
      throw new Error("Access denied: Admin privileges required");
    }

    let users: DocumentData[] = [];
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      users.push(doc.data());
    });

    return users as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
