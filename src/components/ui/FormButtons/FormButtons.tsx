"use client";
import { FC } from "react";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

interface FormButtonsProps {
  isPending: boolean;
  isDirty: boolean;
  isValid: boolean;
  submitButtonText?: string;
}
const FormButtons: FC<FormButtonsProps> = ({
  isPending,
  isDirty,
  isValid,
  submitButtonText,
}) => {
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  };
  return (
    <div className="flex justify-end gap-5">
      <Button
        onClick={handleCancel}
        className="m-0"
        type="button"
        isSecondButton={true}
      >
        <div>Cancel</div>
      </Button>
      <Button
        disabled={isPending || (isDirty && !isValid)}
        isPending={isPending}
        type="submit"
      >
        <div>{submitButtonText ?? "Submit"}</div>
      </Button>
    </div>
  );
};
export default FormButtons;
