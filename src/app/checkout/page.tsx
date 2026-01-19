import CheckoutClient from "@/components/features/checkout/CheckoutClient/CheckoutClient";
import EventDetails from "@/components/features/events/EventDetails/EventDetails";
import { getCheckoutData } from "@/lib/server/checkout";
import { getEventById } from "@/lib/server/events";
type CheckoutSearchParams = {
  cs?: string;
  paymentIntent?: string;
};
type CheckoutPageProps = {
  searchParams: Promise<CheckoutSearchParams>;
};
export default async function CheckoutPage(props: CheckoutPageProps) {
  const searchParams = await props.searchParams;
  if (!searchParams.cs || !searchParams.paymentIntent) {
    return <div>Invalid checkout parameters.</div>;
  }
  const checkoutData = await getCheckoutData(searchParams.paymentIntent);
  console.log('checkoutData', checkoutData);
  
  return (
    <CheckoutClient
      clientSecret={searchParams.cs}
      checkoutData={checkoutData}
    />
  );
}
