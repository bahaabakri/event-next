'use client'
import type { NavMenuItem } from "../navbar-menu-items";
import styles from "./NavMenuItem.module.scss";
import { motion } from "framer-motion";
import Button from "../../Button/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavMenuItem = ({ path, title, isButton }: NavMenuItem) => {
  const pathname = usePathname(); // gives the current route path
  const isActive = pathname === path;
  return (
    <motion.li
      className={`${styles["menu-item"]} text-lg my-2`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {
        <Link href={path} className={isActive ? styles["active"] : undefined}>
          {!isButton ? (
            title
          ) : (
            <Button>
              <div>{title}</div>
            </Button>
          )}
        </Link>
      }
    </motion.li>
  );
};

export default NavMenuItem;
