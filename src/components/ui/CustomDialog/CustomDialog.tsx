'use client'
import {
  Alert,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { FC, ReactElement, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Logo from "@/components/ui/Logo/Logo";
import Button from "@/components/ui/Button/Button";
interface CustomDialogDialogProps {
  children: ReactElement;
  isOpen?: boolean;
  // onSubmitDialog?: (e: React.FormEvent<HTMLDivElement>) => void;
}
const CustomDialog: FC<CustomDialogDialogProps> = ({
  children,
  isOpen
}) => {
  return (
    <div className="overflow-hidden relative h-screen w-screen">
       <Dialog
        open={isOpen ?? true}
        PaperProps={{
          sx: {
            backgroundColor: "var(--color-dark-700)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-primary-800)",
            boxShadow:
              "0 0 25px rgba(194, 30, 86, 0.2), 0 4px 20px rgba(0,0,0,0.6)",
            width: "100%",
            maxWidth: 420,
            padding: "1.5rem",
            backdropFilter: "blur(12px)",
          },
        }}
      >
        {children}
      </Dialog>
    </div>
  );
};
export default CustomDialog;
