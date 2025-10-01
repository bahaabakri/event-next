// app/auth/actions.ts
"use server";

import { API_BASE_URL } from "@/api.config";
import { LoginRegisterResponse, VerifyOtpResponse } from "@/types/auth.type";
import { redirect } from "next/navigation";
// import your BE request util here

export async function loginOrRegister(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  // call your backend
  try {
    const res = await fetch(`${API_BASE_URL}/auth/loginRegister`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const data = (await res.json()) as LoginRegisterResponse;
    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to login",
      };
    }
    return {
      success: true,
      message: data?.message || "Login Successfully",
    };
  } catch (err: any) {
    // network or unexpected errors
    return { success: false, message: err.message || "Something went wrong" };
  }
}

export async function verifyOTP(prevState:any, formData: FormData) {
  const email = formData.get("email") as string;
  const otp = formData.get("otp") as string;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: "POST",
      body: JSON.stringify({ email, otp }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to verify OTP",
      };
    }

    const { access_token, user, message } = data as VerifyOtpResponse;

    // return success
    return { success: true, user, access_token, message };
  } catch (err: any) {
    // network or unexpected errors
    return { success: false, message: err.message || "Something went wrong" };
  }
}
