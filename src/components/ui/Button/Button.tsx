'use client'

import { motion } from "framer-motion"
import { ButtonHTMLAttributes, FC, ReactElement } from "react"
import clsx from "clsx"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement
  isPending?: boolean
  isSecondButton?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  isPending = false,
  isSecondButton = false,
  ...buttonProps
}) => {
  return (
    <div
      className={clsx(
        "w-fit mx-auto rounded-xl", // wrapper styles
        isSecondButton ? "bg-white text-dark-500 shadow-2xl" : "bg-primary-500 text-white"
      )}
    >
      <motion.div
        {...(!buttonProps.disabled && {
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.9 },
        })}
      >
        <button
          {...buttonProps}
          className={clsx(
            "text-md lg:text-lg px-lg py-xs shadow-sm flex gap-xs items-center cursor-pointer rounded-xl",
            buttonProps.disabled && "text-gray-600 bg-gray-800"
          )}
        >
          {isPending && <div className="spinner" />}
          {children}
        </button>
      </motion.div>
    </div>
  )
}

export default Button
