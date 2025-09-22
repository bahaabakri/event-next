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
        "w-fit mx-auto", // wrapper styles
        isSecondButton ? "bg-white text-black shadow-2xl" : "bg-[var(--primary-color)] text-white"
      )}
    >
      <motion.div
        {...(!buttonProps.disabled && {
          whileHover: { scale: 1.2 },
          whileTap: { scale: 0.8 },
        })}
      >
        <button
          {...buttonProps}
          className={clsx(
            "text-lg lg:text-2xl px-5 py-2 shadow-sm rounded-xl flex gap-2 items-center",
            buttonProps.disabled && "text-gray-500 bg-gray-300"
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
