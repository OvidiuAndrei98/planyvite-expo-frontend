import db from "@/lib/firebase/fireStore";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export async function manageSubscription(userId: string) {
  if (!userId) {
    console.error("User not logged in.");
    return;
  }

  // 2. Get the functions instance and reference the callable function
  const functions = getFunctions();
  // The name 'createPortalLink' must match the export name in your server code
  const callableFunction = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  try {
    // 3. Call the function, passing the returnUrl in the data object
    const result = await callableFunction({
      returnUrl: window.location.origin + "/account",
      // You can optionally pass 'locale', 'configuration', or 'flow_data' here
    });

    // The function returns the Stripe Session object, which contains the URL
    const portalUrl = (result.data as { url: string }).url;

    if (portalUrl) {
      // 4. Redirect the user to the Stripe Customer Portal
      window.location.assign(portalUrl);
    } else {
      console.error("Stripe portal URL not returned.");
    }
  } catch (error) {
    // Handle errors thrown by the function (like unauthenticated or internal)
    console.error(
      "Error calling createPortalLink function:",
      error instanceof Error ? error.message : error
    );
    alert("Could not access billing portal. Please try again.");
  }
}
