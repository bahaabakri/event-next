import { API_BASE_URL } from "@/api.config";
import { CheckoutGetterResponse } from "@/types/checkout.type";
import { cookies } from "next/headers";

export async function getCheckoutData(
  paymentIntentId: string
): Promise<CheckoutGetterResponse> {
  const cookieStore = await cookies(); // 👈 await it
  const token = cookieStore.get("access_token")?.value;
  const res = await fetch(
    `${API_BASE_URL}/ticket/checkout/${paymentIntentId}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

//   console.log(await res.json());
  if (!res.ok) throw new Error("Failed to load events");

  return res.json();
}
