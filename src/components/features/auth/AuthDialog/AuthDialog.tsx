// import Button from "@/UI/Button/Button";
'use client';
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
import HeroSlider from "../../home/HeroSlider/HeroSlider";
// import Logo from "@/components/Logo/Logo";
// import HeroOverlay from "@/components/Hero/HeroOverlay/HeroOverlay";
interface AuthDialogProps {
  children: ReactElement;
  footerContent?: ReactElement;
  title: string;
  subtitle: string;
  isSubmitButtonLoading?: boolean;
  isSubmitButtonDisabled?: boolean;
  errorMessage?: string;
  successMessage?:string;
  onSubmitDialog: (e: React.FormEvent<HTMLDivElement>) => void;
}
const AuthDialog: FC<AuthDialogProps> = ({
  children,
  footerContent,
  title,
  subtitle,
  isSubmitButtonLoading,
  isSubmitButtonDisabled,
  errorMessage,
  successMessage,
  onSubmitDialog,
}) => {
  const [open, setOpen] = useState<boolean>(true);
  // const navigate = useNavigate();
  // const activeHero = await getActiveHero();
  const handleDialogSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    // setIsSubmitButtonLoading(true)
    event.preventDefault();
    onSubmitDialog(event);
  };
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
    <div className='overflow-hidden relative h-screen w-screen'>
      <HeroSlider />
      <Dialog
        open={open}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLDivElement>) =>
              handleDialogSubmit(event),
            // onSubmit: (event) => {
            //   event.preventDefault();
            //   const formData = new FormData(event.currentTarget);
            //   const formJson = Object.fromEntries(formData.entries());
            //   const email = formJson.email;
            //   console.log(email);
            //   handleClose();
            // },
          },
        }}
      >
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <DialogTitle className='flex flex-col gap-5'>
          <Logo />
          <div className='text-xl md:text-3xl font-bold text-primary-100'>{title}</div>
        </DialogTitle>
        <DialogContent className='flex flex-col gap-5'>
          <DialogContentText className='text-gray-400'>
            {subtitle}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions className='flex justify-end gap-5'>
          <Button className="m-0" type="button" onClick={handleClose} isSecondButton={true}>
            <div>Cancel</div>
          </Button>
          <Button
            disabled={isSubmitButtonDisabled}
            isPending={isSubmitButtonLoading}
            type="submit"
          >
            <div>Continue</div>
          </Button>
        </DialogActions>
        {footerContent && footerContent}
      </Dialog>
    </div>
  );
};
export default AuthDialog;
