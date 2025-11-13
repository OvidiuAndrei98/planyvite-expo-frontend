import { getFunctions, httpsCallable } from "firebase/functions";

export const grantProAccess = async (targetUid: string, providerId: string) => {
  const functions = getFunctions(undefined, "europe-central2");

  // Referință la funcția Callable
  const grantPro = httpsCallable(functions, "grantManualPro");

  try {
    const result = await grantPro({
      targetUid: targetUid,
      providerId: providerId,
    });

    const responseData = result.data as { success: boolean; message: string };
    alert(`✅ Succes: ${responseData.message}`);
  } catch (error) {
    console.error("Eroare la acordarea manuală PRO:", error);
  }
};
