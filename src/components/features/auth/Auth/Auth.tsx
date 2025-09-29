// app/auth/page.tsx
"use client";
import { useFormStatus } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthDialog from "@/components/features/auth/AuthDialog/AuthDialog";
import { loginOrRegister } from "@/lib/server/auth";
import CustomTextField from "@/components/ui/CustomTextField/CustomTextFiield";
import Button from "@/components/ui/Button/Button";

const loginRegisterFormValidationSchema = yup.object({
  email: yup.string().required("Email is required").email("Enter valid email"),
});

export default function Auth() {
  const { pending: isPending } = useFormStatus();
  const {
    control,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(loginRegisterFormValidationSchema),
    mode: "onBlur",
  });

  return (
    <AuthDialog
      title="Welcome on board."
      subtitle="Enter your email to continue"
      isSubmitButtonDisabled={isPending || (isDirty && !isValid)}
      isSubmitButtonLoading={isPending}
    >
      <form action={loginOrRegister} className="flex flex-col gap-5">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <CustomTextField
              {...field}
              placeholder="Enter Email here"
              errorMessage={fieldState.error?.message || ""}
            />
          )}
        />
        <div className="flex justify-end gap-5">
          <Button className="m-0" type="button" isSecondButton={true}>
            <div>Cancel</div>
          </Button>
          <Button
            disabled={isPending || (isDirty && !isValid)}
            isPending={isPending}
            type="submit"
          >
            <div>Continue</div>
          </Button>
        </div>
      </form>
    </AuthDialog>
  );
}
