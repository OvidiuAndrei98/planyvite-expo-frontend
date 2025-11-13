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

export const setAdminRole = functions.https.onRequest(async (req, res) => {
  // Măsură de securitate simplă: permit doar cererile GET
  if (req.method !== "GET") {
    res.status(405).send("Metoda nu este permisă.");
    return;
  }

  try {
    // 1. Setează Custom Claim-ul 'role: admin'
    await admin.auth().setCustomUserClaims("E0dEOp5noiYGqOXVGM6pwYH9PwD2", {
      admin: true,
    });

    // 2. Trimite un răspuns de succes
    res.status(200).json({
      success: true,
      message: `Rolul 'admin' a fost setat cu succes pentru UID: ${"E0dEOp5noiYGqOXVGM6pwYH9PwD2"}.`,
    });
  } catch (error) {
    console.error("Eroare la setarea rolului admin:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export const grantManualPro = functions.https.onCall(
  { region: "europe-central2" },
  async (request) => {
    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Acces neautorizat. Funcția poate fi apelată doar de utilizatori autentificați."
      );
    }

    const isAdmin = request.auth.token.admin;

    const targetUid: string = request.data.targetUid; // ID-ul utilizatorului care primește acces
    const providerId: string = request.data.providerId; // ID-ul furnizorului public asociat

    if (!isAdmin) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Acces neautorizat. Funcția poate fi apelată doar de administratori."
      );
    }

    // 2. VALIDARE: Asigură-te că datele necesare au fost trimise
    if (!targetUid || !providerId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Lipsesc ID-ul utilizatorului țintă (targetUid) sau ID-ul furnizorului (providerId)."
      );
    }

    try {
      // A. SETAREA CUSTOM CLAIM: Setează rolul 'pro' în Firebase Auth
      await admin.auth().setCustomUserClaims(targetUid, { stripeRole: "pro" });

      // Acest document declanșează funcția ta existentă de sincronizare
      const subscriptionRef = db
        .collection("customers")
        .doc(targetUid)
        .collection("subscriptions")
        .doc("manual_pro_grant");

      await subscriptionRef.set({
        isManualGrant: true, // Marker crucial pentru ignorarea de către Stripe Webhooks
        status: "active",
        created: admin.firestore.FieldValue.serverTimestamp(),
        // Setăm o dată foarte îndepărtată pentru a simula "fără expirare"
        current_period_end: new Date("2099-01-01"),
        items: [], // Nu este nevoie de detalii de preț Stripe
        metadata: {
          ProviderId: providerId, // Folosit de trigger-ul tău pentru actualizarea publică
        },
      });

      return {
        success: true,
        message: `Acces PRO acordat manual și sincronizat pentru UID: ${targetUid}.`,
      };
    } catch (error) {
      console.error(
        `Eroare la acordarea manuală a PRO pentru ${targetUid}:`,
        error
      );
      throw new functions.https.HttpsError(
        "internal",
        "A apărut o eroare la procesarea cererii de acordare a accesului."
      );
    }
  }
);
