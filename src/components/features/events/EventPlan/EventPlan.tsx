import Button from "@/components/ui/Button/Button";
import { Plan } from "@/types/events.type";
import { FC, useState } from "react";

const EventPlan: FC<{
  plan: Plan;
  onQuantityChange: (planId: number, quantity: number) => void;
}> = ({ plan, onQuantityChange }) => {
  const [qty, setQty] = useState(0);
  const update = (value: number) => {
    const newVal = Math.max(0, value);
    setQty(newVal);
    onQuantityChange(plan.id, newVal);
  };
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg hover:-translate-y-1">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition">
        {plan.name}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
        {plan.description}
      </p>

      {/* Price */}
      <div className="mt-4 text-2xl font-bold text-primary">
        {plan.price}{" "}
        <span className="text-sm font-medium text-gray-500">
          {plan.currency}
        </span>
      </div>

      {/* Action */}
      {qty > 0 ? (
        <div className="flex items-center gap-3 mt-4">
          <Button
            onClick={() => update(qty - 1)}
            className="px-3 py-1 border rounded"
          >
            <div>-</div>
          </Button>

          <span className="font-semibold">{qty}</span>

          <Button
            onClick={() => update(qty + 1)}
            className="px-3 py-1 border rounded"
          >
            <div>+</div>
          </Button>
        </div>
      ) : (
        <Button onClick={() => update(1)}>
          <div>Add Ticket</div>
        </Button>
      )}
    </div>
  );
};

export default EventPlan;
