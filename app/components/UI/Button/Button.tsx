'use client'
import { motion } from "framer-motion"
import styles from './Button.module.scss'
import { ButtonHTMLAttributes, FC, ReactElement } from "react"
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactElement;
    isPending?: boolean;
    isSecondButton?: boolean
}
const Button:FC<ButtonProps> = ({children, isPending = false, isSecondButton = false, ...buttonProps}) => {
    return (
        <div className={`${styles['button-wrapper']} ${isSecondButton ? styles['second-button']: styles['primary-button']}`}>
        
        <motion.div
        {...(!buttonProps.disabled && {
            whileHover:{scale: 1.2 },
            whileTap:{scale: 0.8 }
        })}

        >
            <button {...buttonProps}>
                {isPending && <div className="spinner"></div>}
                {children}
            </button>
        </motion.div>
    </div>
    )
}
export default Button