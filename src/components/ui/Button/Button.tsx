"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, FC, ReactElement } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement;
  isPending?: boolean;
  isSecondButton?: boolean;
  width?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  isPending = false,
  isSecondButton = false,
  width = "",
  ...buttonProps
}) => {
  return (
    <motion.div
      {...(!buttonProps.disabled && {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
      })}
      className={clsx(
        " rounded-xl", // wrapper styles
        "w-fit",
        isSecondButton
          ? "bg-white text-dark-500 shadow-2xl"
          : "bg-primary-500 text-white",
        buttonProps.className
      )}
    >
      <button
        {...buttonProps}
        className={clsx(
          "text-md lg:text-lg px-lg py-xs shadow-sm flex gap-xs items-center justify-center cursor-pointer rounded-xl w-full text-center",
          buttonProps.disabled || (isPending && "text-gray-600 bg-gray-800")
        )}
      >
        {isPending && <div className="spinner" />}
        {children}
      </button>
    </motion.div>
  );
};

export default Button;
