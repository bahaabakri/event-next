'use client'
import { FC, useEffect, useState } from "react"
// import heroImagesPath from '../hero-images';
import { AnimatePresence, motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";
interface BackgroundSliderProps {
    imagesPath: string[];
}
const BackgroundSlider:FC<BackgroundSliderProps> = ({imagesPath}) => {
    const [selectedHeroImageIndex, setSelectedHeroImageIndex] = useState<number>(0)
    const {isAuthenticated, user} =  useAuth()

    useEffect(() => {
        const heroImagesInterval = setInterval(() => {
            setSelectedHeroImageIndex(prev => (prev + 1) % imagesPath.length)
        }, 10000)

        return () => {
            clearInterval(heroImagesInterval)
        }
    })
    useEffect(() => {
        console.log(isAuthenticated, user);
        
    }, [isAuthenticated, user])
    return (
        <div className='w-full h-full bg-black'>
        {
        <AnimatePresence>
            <motion.div
                key={selectedHeroImageIndex}
                style={{
                    backgroundImage: `url(${imagesPath[selectedHeroImageIndex]})`
                }}
                className='w-full h-full opacity-20 bg-no-repeat bg-center bg-cover'
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.2, x: 0 }}
                exit={{ opacity: 0, x: +50 }}
                transition={{ duration: 1, ease:'easeInOut' }}
            />
        </AnimatePresence>
        }
    </div>
    )
}
export default BackgroundSlider