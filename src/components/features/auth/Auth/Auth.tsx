// app/auth/page.tsx
"use client";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthDialog from "@/components/features/auth/AuthDialog/AuthDialog";
import { loginOrRegister } from "@/lib/server/auth";
import CustomTextField from "@/components/ui/CustomTextField/CustomTextFiield";
import FormButtons from "@/components/ui/FormButtons/FormButtons";
import { useActionState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

const loginRegisterFormValidationSchema = yup.object({
  email: yup.string().required("Email is required").email("Enter valid email"),
});
export default function Auth() {
  const router = useRouter();
  const [formStateRes, formAction, isPending] = useActionState(loginOrRegister, {
    success: false,
    message: "",
  });
  const {
    control,
    setValue,
    watch,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(loginRegisterFormValidationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (formStateRes.success) {
      router.push(`/otp?email=${watch('email')}`);
    } else {
      setValue("email", formStateRes.message);
    }
  }, [formStateRes.success]);
  return (
    <AuthDialog
      title="Welcome on board."
      subtitle="Enter your email to continue"
    >
      <form action={formAction} className="flex flex-col gap-5">
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
        <FormButtons
          isPending={isPending}
          isDirty={isDirty}
          isValid={isValid}
          submitButtonText="Continue"
        />
      </form>
    </AuthDialog>
  );
}
