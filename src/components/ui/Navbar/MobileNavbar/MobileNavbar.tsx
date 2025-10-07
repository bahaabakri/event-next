'use client'
import { useRef, useState } from "react"
import { motion, type Variants } from "framer-motion"
import styles from './MobileNavbar.module.scss'
import NavMenuItem from "../NavMenuItem/NavMenuItem"
import SearchBar from "../../SearchBar/SearchBar"
import navMenuItems  from "../navbar-menu-items"
const sidebarVariants: any = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 275px 30px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(23px at 275px 30px)",
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
}

interface PathProps {
    d?: string
    variants: Variants
    transition?: { duration: number }
}

const Path = (props: PathProps) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="var(--primary-color)"
        strokeLinecap="round"
        {...props}
    />
)
const MenuToggle = ({ toggle }: { toggle: () => void }) => (
    <button className={styles['toggle-container']} onClick={toggle}>
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                }}
            />
        </svg>
    </button>
)

const navVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
}

const Navigation = () => (
    <motion.ul className={`${styles['list']}`} variants={navVariants}>
        <li><SearchBar /></li>
        {navMenuItems.map((navMenuItem) => (
            <NavMenuItem key={navMenuItem.id} {...navMenuItem} />
        ))}
    </motion.ul>
)
const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div>
            <div className={styles['navbar-wrapper']}>
                <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    ref={containerRef}
                    className={styles['navbar']}
                >
                    <motion.div className={styles['navbar-bg']} variants={sidebarVariants} />
                    <Navigation />
                    <MenuToggle toggle={() => setIsOpen(!isOpen)} />
                </motion.nav>
            </div>
        </div>
    )
}
export default MobileNav