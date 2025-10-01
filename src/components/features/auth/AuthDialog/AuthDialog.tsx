"use client";
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
import CustomDialog from "@/components/ui/CustomDialog/CustomDialog";
interface AuthDialogProps {
  children: ReactElement;
  footerContent?: ReactElement;
  title: string;
  subtitle: string;
  isSubmitButtonLoading?: boolean;
  isSubmitButtonDisabled?: boolean;
  errorMessage?: string;
  successMessage?: string;
  // onSubmitDialog?: (e: React.FormEvent<HTMLDivElement>) => void;
}
const AuthDialog: FC<AuthDialogProps> = ({
  children,
  footerContent,
  title,
  subtitle,
  errorMessage,
  successMessage
}) => {
  const [open, setOpen] = useState<boolean>(true);
  // const navigate = useNavigate();
  // const activeHero = await getActiveHero();
  // const handleDialogSubmit = (event: React.FormEvent<HTMLDivElement>) => {
  //   // setIsSubmitButtonLoading(true)
  //   event.preventDefault();
  //   onSubmitDialog(event);
  // };
  const handleClose = () => {
    // go back
    // navigate(-1);
  };
  useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(false);
    };
  }, []);
  return (
    <div className="overflow-hidden relative h-screen w-screen">
      <CustomDialog isOpen={open}>
        <>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          <DialogTitle className="flex flex-col gap-5">
            <Logo />
            <div className="text-xl md:text-3xl font-bold text-primary-100">
              {title}
            </div>
          </DialogTitle>
          <DialogContent className="flex flex-col gap-5">
            <DialogContentText className="!text-gray-50">
              {subtitle}
            </DialogContentText>
            {children}
          </DialogContent>
          {footerContent && footerContent}
        </>
      </CustomDialog>
    </div>
  );
};
export default AuthDialog;
