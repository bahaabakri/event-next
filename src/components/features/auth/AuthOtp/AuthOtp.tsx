// app/auth/page.tsx
"use client";
import { useFormStatus } from "react-dom";
import { Controller, set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthDialog from "@/components/features/auth/AuthDialog/AuthDialog";
import Button from "@/components/ui/Button/Button";
import CustomOtpInput from "@/components/ui/CustomOtpInput/CustomOtpInput";
import { sub } from "framer-motion/client";
import { verifyOTP } from "@/lib/server/auth";
import { useEffect, useState } from "react";

const otpFormValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter valid email address"),
  otp: yup.string().required("OTP is required"),
});

export default function AuthOtp() {
  const { pending: isPending } = useFormStatus();
  const [email, setEmail] = useState<string>("");
  const {
    control,
    setValue,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: { otp: "" },
    resolver: yupResolver(otpFormValidationSchema),
    mode: "onBlur",
  });
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    setEmail(email || "");
  });
  const title = " Verify your email.";
  const subtitle = "Please enter the code we just sent to your email address.";
  return (
    <AuthDialog
      title={title}
      subtitle={subtitle}
      isSubmitButtonDisabled={isPending || (isDirty && !isValid)}
      isSubmitButtonLoading={isPending}
    >
      <form action={verifyOTP} className="flex flex-col gap-5">
        <input type="hidden" name="email" value={email} />
        <Controller
          name="otp"
          control={control}
          render={({ field, fieldState }) => (
            <CustomOtpInput
              {...field}
              errorMessage={fieldState.error?.message || ""}
              length={6}
              maxWidth={48}
              textColor="var(--color-gray-500)"
              onChange={(otp) => {
                if (otp.length >= 6) {
                  setValue("otp", otp);
                }
              }}
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
            <div>Verify</div>
          </Button>
        </div>
      </form>
    </AuthDialog>
  );
}
