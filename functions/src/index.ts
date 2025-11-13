import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { logger, setGlobalOptions } from "firebase-functions";
import { initializeApp } from "firebase-admin/app";

initializeApp();

const db = admin.firestore();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

export const syncProviderStatus = functions.firestore.onDocumentWritten(
  {
    document: "customers/{customerId}/subscriptions/{subscriptionId}",
    region: "europe-central2",
    maxInstances: 100,
  },
  async (event) => {
    const subAfter = event.data?.after.data();

    if (!subAfter) {
      return null;
    }

    const subBefore = event.data?.before.data();

    if (subAfter?.status === subBefore?.status) return null;

    const providerId = subAfter?.metadata?.ProviderId;

    if (!providerId) return null;

    const newStatus = subAfter?.status;
    const isCurrentlyActive =
      newStatus === "active" || newStatus === "trialing";

    const providerDocRef = db.collection("providers").doc(providerId);

    await providerDocRef.update({
      providerPlan: isCurrentlyActive ? "pro" : "free",
      proStatusUpdated: admin.firestore.FieldValue.serverTimestamp(),
    });

    logger.info("Provider updated", { value: providerId });

    return null;
  }
);
