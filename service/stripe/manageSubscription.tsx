import { getFunctions, httpsCallable } from "firebase/functions";

export async function manageSubscription(userId: string) {
  if (!userId) {
    console.error("User not logged in.");
    return;
  }

  const functions = getFunctions(undefined, "europe-central2");
  const callableFunction = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  try {
    const result = await callableFunction({
      returnUrl: window.location.origin + "/dashboard/setari-furnizor",
    });

    const portalUrl = (result.data as { url: string }).url;

    if (portalUrl) {
      window.location.assign(portalUrl);
    } else {
      console.error("Stripe portal URL not returned.");
    }
  } catch (error) {
    console.error(
      "Error calling createPortalLink function:",
      error instanceof Error ? error.message : error
    );
  }
}
