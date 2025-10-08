"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { removeAuthToken } from "@/lib/client/auth-cookie";
import { checkIsAuthenticated } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const LogoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    removeAuthToken();
    dispatch(checkIsAuthenticated());
    router.push("/");
  }, [router]);

  return null;
};

export default LogoutPage;