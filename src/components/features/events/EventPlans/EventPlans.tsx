import { Plan } from "@/types/events.type";
import { FC } from "react";
import EventPlan from "../EventPlan/EventPlan";

const EventPlans: FC<{ plans: Plan[], onPlanChange: (planId: number, quantity: number) => void; }> = ({ plans, onPlanChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((p) => (
        <EventPlan key={p.id} plan={p}onQuantityChange={onPlanChange}
 />
      ))}
    </div>
  );
};

export default EventPlans;
