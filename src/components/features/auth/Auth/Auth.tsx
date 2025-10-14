// app/auth/page.tsx
"use client";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthDialog from "@/components/features/auth/AuthDialog/AuthDialog";
import { loginOrRegister, loginWithGoogleBE } from "@/lib/server/auth";
import CustomTextField from "@/components/ui/CustomTextField/CustomTextFiield";
import FormButtons from "@/components/ui/FormButtons/FormButtons";
import { useActionState, useEffect, useState, useTransition } from "react";
import { redirect, useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import type { TokenResponse } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setAuthToken } from "@/lib/client/auth-cookie";
import { checkIsAuthenticated } from "@/store/authSlice";

const loginRegisterFormValidationSchema = yup.object({
  email: yup.string().required("Email is required").email("Enter valid email"),
});

export default function Auth() {
  const router = useRouter();
  const [formStateRes, formAction, isPending] = useActionState(
    loginOrRegister,
    {
      success: false,
      message: "",
    }
  );
  const [googleLoginState, googleLoginAction] = useActionState(
    loginWithGoogleBE,
    { success: false, message: "" }
  );
  const [isGoogleLoginPending, startGoogleLoginTransition] = useTransition();

  // const [isGoogleLoginPending, setIsGoogleLoginPending] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (googleLoginState.success && googleLoginState.access_token) {
      // Save token and update auth state
      setAuthToken(googleLoginState.access_token);
      dispatch(checkIsAuthenticated());
      router.push("/"); // or wherever you want
    } else if (googleLoginState.message) {
      console.log("Google login failed:", googleLoginState.message);
    }
  }, [googleLoginState]);
  const handleGoogleOAuthSuccess = async (tokenResponse: TokenResponse) => {
    await new Promise((r) => setTimeout(r, 50)); // ensure re-render flush
    const token = tokenResponse.access_token;
    console.log("GOOGLE LOGIN SUCCESS", token);
    const formData = new FormData();
    formData.append("token", token);
    // trigger the server action
    startGoogleLoginTransition(() => {
      googleLoginAction(formData);
    });
  };
  const handleGoogleOAuthError = () => {
    console.log("Login Failed");
  };
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      handleGoogleOAuthSuccess(tokenResponse);
    },
    onError: handleGoogleOAuthError,
  });
  const title = " Welcome on board.\n One place for all events in the world";
  const subtitle =
    "To subscribe to this website, please enter your email address here. We will send updates occasionally.";
  const footerContent = (
    <>
      <div className="flex gap-2 text-gray-400 items-center">
        <div className="flex-grow border-b border-gray-400"></div>
        Or sign in with
        <div className="flex-grow border-b border-gray-400"></div>
      </div>
      <div className="flex gap-5 justify-center p-5">
        <img src={"/auth/facebook.svg"} alt="" />
        <img
          src={"/auth/google.svg"}
          alt=""
          onClick={() => loginWithGoogle()}
        />
        {/* <GoogleLogin ref={googleLoginButtonRef} onSuccess={handleGoogleOAuthSuccess} onError={handleGoogleOAuthError}></GoogleLogin> */}
        <img src={"/auth/apple.svg"} alt="" />
      </div>
    </>
  );
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
      router.push(`/otp?email=${watch("email")}`);
    } else {
      setValue("email", formStateRes.message);
    }
  }, [formStateRes.success]);
  return (
    <AuthDialog title={title} subtitle={subtitle} footerContent={footerContent}>
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
          isPending={isPending || isGoogleLoginPending}
          isDirty={isDirty}
          isValid={isValid}
          submitButtonText="Continue"
        />
      </form>
    </AuthDialog>
  );
}
