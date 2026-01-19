"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutGetterResponse } from "@/types/checkout.type";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

type CheckoutClientProps = {
  clientSecret: string | undefined;
  checkoutData: CheckoutGetterResponse
};
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutClient = ({
  clientSecret,
  checkoutData,
}: CheckoutClientProps) => {

  return (
    <div className="p-4 mt-12 space-y-6">
      {/* ORDER SUMMARY */}
      <div className="border p-4 rounded-lg space-y-2">
        <h2 className="font-bold text-lg">{checkoutData.event.name}</h2>
        <p className="text-sm text-gray-500">{checkoutData.event.location}</p>

        {checkoutData.plans.map((p) => (
          <div key={p.planId} className="flex justify-between text-sm">
            <span>{p.name} × {p.quantity}</span>
            <span>${p.price * p.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total</span>
          <span>${checkoutData.total}</span>
        </div>
      </div>

      {/* STRIPE PAYMENT */}
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default CheckoutClient;
