import { User } from "./user.type";

export type Ticket = {
  checkedInAt: string | null;
  createdAt: string | null;
  id: number;
  purchasedAt: string | null;
  qrCodeUrl: string | null;
  status: string;
  updatedAt: string | null;
  user: User;
};
