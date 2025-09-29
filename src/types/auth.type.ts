import { User } from "./user.type";

export type LoginRegisterBodyRequest = {
  email: string;
};
export type LoginRegisterResponse = {
  user: User;
  message: string;
};

export type VerifyOtpRequest = {
  otp: string;
  email: string;
};
export type VerifyOtpResponse = {
  user: User;
  message: string;
  access_token: string;
};
