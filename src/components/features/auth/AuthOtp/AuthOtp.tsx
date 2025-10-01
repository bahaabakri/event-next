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
import { useActionState, useEffect, useState } from "react";
import FormButtons from "@/components/ui/FormButtons/FormButtons";

const otpFormValidationSchema = yup.object({
  otp: yup
    .string()
    .required("OTP is required")
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits"),
});

export default function AuthOtp() {
  const title = " Verify your email.";
  const subtitle = "Please enter the code we just sent to your email address.";
  const [email, setEmail] = useState<string>("");
  const [formStateRes, formAction, isPending] = useActionState(verifyOTP, {
    success: false,
    message: "",
  });
  const {
    control,
    watch,
    setValue,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: { otp: "" },
    resolver: yupResolver(otpFormValidationSchema),
    mode: "onChange",
  });
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    setEmail(email || "");
  });
  useEffect(() => {
    if (formStateRes.success) {
      console.log("access-token", formStateRes.access_token);

      // router.push(`/otp?email=${watch('email')}`);
    } else {
      console.log("error", formStateRes);
      setValue("otp", formStateRes.message);
    }
  }, [formStateRes.success]);
  return (
    <AuthDialog title={title} subtitle={subtitle}>
      <form action={formAction} className="flex flex-col gap-5">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="otp" value={watch("otp")} />{" "}
        {/* ✅ Add this */}
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
            />
          )}
        />
        <FormButtons
          isPending={isPending}
          isDirty={isDirty}
          isValid={isValid}
          submitButtonText="Verify"
        />
      </form>
    </AuthDialog>
  );
}
