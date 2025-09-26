// app/auth/actions.ts
"use server";

import { API_BASE_URL } from "@/api.config";
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

  const data = await res.json();

  // redirect to OTP
  redirect(`/auth/otp?email=${email}`);
}
