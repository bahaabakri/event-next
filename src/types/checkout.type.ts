

type CheckoutEvent = {
    id: number;
    name: string;
    date: string;
    location: string;
}
type CheckoutPlan = {
    planId: number;
    name: string;
    price: number;
    quantity: number;
}
type CheckoutTicket = {
    id: number;
    status: string;
    purchasedAt: string | null;
    reservationExpiresAt: string | null;
}
export type CheckoutGetterResponse = {
    event: CheckoutEvent;
    plans: CheckoutPlan[];
    total: number;
    tickets: CheckoutTicket[];
}