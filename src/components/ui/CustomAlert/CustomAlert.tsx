"use client";

import { Alert } from "@mui/material";
import { FC } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
type CustomAlertProps = {
    message: string;
    status: "success" | "error" | "info" | "warning";
};
const CustomAlert:FC<CustomAlertProps> = ({ message, status }) => {
    const AlertIcon = () => {
        switch (status) {
            case "success":
                return <CheckIcon className="text-success-500" />;
            case "error":
                return <ErrorIcon className="text-error-500" />;
            case "info":
                return <InfoIcon className="text-info-500" />;
            case "warning":
                return <WarningIcon className="text-warning-500" />;
            default:
                return null;
        }
    }
  return (
    <Alert icon={<AlertIcon />} severity={status}>
      {message}
    </Alert>
  );
};

export default CustomAlert;
