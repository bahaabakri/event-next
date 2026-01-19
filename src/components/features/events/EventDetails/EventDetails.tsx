"use client";
import { MyEvent } from "@/types/events.type";
import ImageSlider from "@/components/ui/ImageSlider/ImageSlider";
import { transformIsoDateToReadable } from "@/services/date";
import Image from "next/image";
import { API_BASE_URL } from "@/api.config";
import { useActionState, useEffect, useState } from "react";
import { joinEvent } from "@/lib/server/events";
import Button from "@/components/ui/Button/Button";
import { useSnackbar } from "@/providers/SnackbarProvider/SnackbarProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useAuth from "@/hooks/useAuth";
import { log } from "console";
import BannerSwiper from "@/components/ui/BannerSwipper/BannerSwipper";
import StaticMap from "@/components/ui/StaticMap/StaticMap";
import EventPlans from "../EventPlans/EventPlans";
import useNav from "@/hooks/useNav";
import { useRouter } from "next/navigation";
import { form } from "framer-motion/client";
interface EventDetailsProps {
  event: MyEvent;
}
const EventDetails = ({ event }: EventDetailsProps) => {
  const { showSnackbar } = useSnackbar();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isUserAlreadyJoined, setIsUserAlreadyJoined] = useState(false);
  const [formStateRes, formAction, isPending] = useActionState(joinEvent, {
    success: false,
    message: "",
  });
  const [mounted, setMounted] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState<
    { planId: number; quantity: number }[]
  >([]);
  useEffect(() => {
    setMounted(true);
  }, []);
  // console.log("isUserAlreadyJoined", isUserAlreadyJoined);
  // console.log("isAuthenticated", isAuthenticated);
  // console.log("user", user);
  // console.log("event", event);
  console.log('formStateRes', formStateRes);
  
  useEffect(() => {
    setIsUserAlreadyJoined(
      event.tickets.find((el) => el.user.id === user?.id) ? true : false
    );
  }, [user]);
  useEffect(() => {
    if (formStateRes.success && formStateRes.clientSecret && formStateRes.paymentIntentId) {
      // showSnackbar(formStateRes.message, "success");
      router.push(`/checkout?cs=${formStateRes.clientSecret}&paymentIntent=${formStateRes.paymentIntentId}`);
    } else {
      showSnackbar(formStateRes.message, "error");
    }
  }, [formStateRes.success, formStateRes.clientSecret, formStateRes.paymentIntentId]);

  const handlePlanChange = (planId: number, quantity: number) => {
    setSelectedPlans((prev) => {
      if (quantity === 0) {
        return prev.filter((p) => p.planId !== planId);
      }

      const exists = prev.find((p) => p.planId === planId);

      if (exists) {
        return prev.map((p) => (p.planId === planId ? { ...p, quantity } : p));
      }

      return [...prev, { planId, quantity }];
    });
  };

  return (
    <div className="container px-2 flex flex-col gap-5 m-auto mt-36">
      <BannerSwiper
        imagesPath={event.images.map((el) => `${API_BASE_URL}${el.url}`)}
      />
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="text-sm md:text-lg">
            On {transformIsoDateToReadable(event.date)} At {event.location}
          </div>
          <div className="font-bold text-2xl md:text-5xl">{event.name}</div>
          <div className="text-xs md:text-sm;">{event.description}</div>
        </div>
        <div className="flex-1">
          <StaticMap lat={event.lat} lng={event.lng} />
        </div>
      </div>
      <EventPlans plans={event.plans} onPlanChange={handlePlanChange} />
      {mounted && !isUserAlreadyJoined && (
        <div className="flex flex-col gap-2">
          <form action={formAction}>
            {selectedPlans.length > 0 && (
              <div className="flex gap-5">
                <div className="text-mygray-500">Total:</div>
                <div className="font-bold text-xl text-primary-500">
                  {selectedPlans.reduce(
                    (acc, plan) =>
                      acc +
                      plan.quantity *
                        (event.plans.find((p) => p.id === plan.planId)?.price ||
                          0),
                    0
                  )}
                  {" Dollars "}
                  {`(${selectedPlans.reduce((acc, plan) => acc + plan.quantity, 0)}`}{" "}
                  Tickets{")"}
                </div>
              </div>
            )}
            <input type="hidden" name="id" value={event.id} />
            <input
              type="hidden"
              name="plans"
              value={JSON.stringify(selectedPlans)}
            />
            <Button type="submit" isPending={isPending}>
              <div>Join Event</div>
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
