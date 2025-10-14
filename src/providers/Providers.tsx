"use client";

import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "../store/store";
import { checkIsAuthenticated } from "../store/authSlice";
import { useEffect } from "react";
import ClientThemeProvider from "@/providers/ClientThemeProvider/ClientThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/api.config";
import { SnackbarProvider } from "./SnackbarProvider/SnackbarProvider";

function InitAuth() {
  // dispatch check auth action on first load
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkIsAuthenticated());
  }, [dispatch]);
  return null; // No UI
}
export function Providers({ children }: { children: React.ReactNode }) {
  // console.log(GOOGLE_CLIENT_ID);
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <InitAuth />
        <ClientThemeProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ClientThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}
