import db from "@/lib/firebase/fireStore";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

/**
 * Queries Firestore for the most relevant subscription document for a user.
 * This is used to provide detailed UX messaging.
 * @param {string} uid - The Firebase User ID.
 * @returns {Promise<string>} A detailed status code (e.g., "no_subscription", "payment_issue", "on_trial").
 */
export async function getDetailedSubscriptionStatus(
  uid: string
): Promise<string> {
  try {
    const subscriptionsRef = collection(db, "customers", uid, "subscriptions");

    // Query for the most recent subscription document
    const q = query(
      subscriptionsRef,
      orderBy("created", "desc"), // Sort by creation date to get the newest
      limit(1) // Only fetch one document
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return "no_subscription";
    }

    const subData = snapshot.docs[0].data();
    const status = subData.status;

    switch (status) {
      case "active":
      case "trialing":
        // If the Firestore status is active/trialing but the claim is missing,
        // there might be a sync issue or the token hasn't refreshed.
        // For UX, treat it as active (but the security layer will check the claim).
        return "active";

      case "past_due":
      case "unpaid":
        return "payment_issue";

      case "canceled":
        // Check if the service period has truly ended
        if (subData.current_period_end.seconds * 1000 > Date.now()) {
          // Canceled but still active until period end
          return "canceled_until_period_end";
        }
        return "canceled"; // Canceled and service period is over

      default:
        // Covers 'incomplete', 'paused', etc.
        return "inactive";
    }
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return "error";
  }
}
