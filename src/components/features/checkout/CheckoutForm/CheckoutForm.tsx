"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    setLoading(false);

    if (error) {
      setError(error.message || "An unexpected error occurred.");
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      router.push("/events/checkout/success");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <PaymentElement />

      <Button
        disabled={!stripe || loading}
        isPending={loading}
      >
        <div> Pay Now</div>
      </Button>

      {error && <p className="text-error-500 text-sm">{error}</p>}
    </form>
  );
}
