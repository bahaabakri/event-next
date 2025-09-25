'use client'
import BackgroundSlider from '@/components/ui/BackgroundSlider/BackgroundSlider';
import { motion } from "framer-motion";
import Button from '@/components/ui/Button/Button';
import OLogo from '@/components/ui/OlLgo/OLogo';
import { MyHero } from '@/types/hero.type';
import { FC } from 'react';
import { API_BASE_URL } from '@/api.config';
export type HeroProps = {
    activeHero: MyHero
}
const Hero:FC<HeroProps> = ({activeHero}) => {
    console.log(activeHero);
    
    return (
        <div className='overflow-hidden relative h-screen w-screen'>
            <BackgroundSlider imagesPath={activeHero.images.map(el => `${API_BASE_URL}${el.url}`)} />
            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center text-white'>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                    }}
                >
                    <div className='flex flex-col gap-lg px-10 max-w-[900px]'>
                        <div className='text-white font-bold text-2xl lg:text-4xl flex justify-center tracking-[5px]'>
                            <div className='self-start lg:self-center min-w-xxl'>
                                <OLogo />
                            </div>
                            <div className=''>
                                ne Place Where The Events Live
                            </div>
                        </div>
                        <div className='text-white text-lg lg:text-xl lg:leading-xxl text-center'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, non. Eius quae architecto delectus aspernatur maiores, minima dignissimos nihil error dicta cumque, enim exercitationem, aliquid et rerum. Enim, nihil odio!
                        </div>
                        <Button>
                            <div>Get Started</div>
                        </Button>
                    </div>
                </motion.div>

            </div>
        </div>

    )
}

export default Hero