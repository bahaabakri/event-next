// app/auth/actions.ts
"use server";

import { API_BASE_URL } from "@/api.config";
import { LoginRegisterResponse, VerifyOtpResponse } from "@/types/auth.type";
import { verify } from "crypto";
import { redirect } from "next/navigation";
// import your BE request util here

export async function loginOrRegister(formData: FormData) {
  const email = formData.get("email") as string;

  // call your backend
  const res = await fetch(`${API_BASE_URL}/auth/loginRegister`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) {
    throw new Error("Failed to login/register");
  }

  const data = await res.json() as LoginRegisterResponse;

  // redirect to OTP
  redirect(`/auth/otp?email=${email}`);
}


export async function verifyOTP(formData: FormData) {
  const email = formData.get("email") as string;
  const code = formData.get("code") as string;

  // call your backend
  const res = await fetch(`${API_BASE_URL}/auth/verify`, {
    method: "POST",
    body: JSON.stringify({ email, code }),
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) {
    throw new Error("Failed to verify OTP");
  }

  const data = await res.json() as VerifyOtpResponse;

  // Assuming the response contains a token and user info
  const { access_token, user } = data;
}
