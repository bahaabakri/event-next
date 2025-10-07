'use client'
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchBar.module.scss'
import { useState, useRef, useEffect } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import CustomTextField from '../CustomTextField/CustomTextFiield';
import { motion } from 'framer-motion';

const searchBarVariants:any = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 175px 25px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(23px at 175px 25px)",
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
}


const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()
    useEffect(() => {
        if (isMobile) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [isMobile])
    const openSearchBar = () => {
        if (isMobile) {
            return
        }
        setIsOpen(!isOpen)
    }
    return (
        <div className={styles['search-bar-wrapper']}>
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                ref={containerRef}
                className={styles['search-bar']}
            >
                <motion.div className={styles['search-bar-bg']} variants={searchBarVariants} />
                {
                    isOpen && <div  className={styles['search-bar-input-wrapper']}>
                    <CustomTextField placeholder='Enter Text'/>
                </div>
                }

                <div  className={styles['search-bar-icon-wrapper']} onClick={openSearchBar} >
                    <SearchIcon sx={{color: 'var(--primary-color)'}} />
                </div>
            </motion.div>

        </div>
    )
}
export default SearchBar