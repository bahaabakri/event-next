"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import OLogo from "@/components/ui/OlLgo/OLogo";
import { FC } from "react";
import { getActiveHero } from "@/lib/server/hero";
type HeroContentProps = {
  title: string;
  description: string;
};
const HeroContent: FC<HeroContentProps> = ({ title, description }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        <div className="flex flex-col gap-lg px-10 max-w-[900px]">
          <div className="text-white font-bold text-2xl lg:text-4xl flex justify-center tracking-[5px]">
            <div className="self-start lg:self-center min-w-xxl text-primary-500">
              {title.split("")[0]}
            </div>
            <div className="">{title.slice(1)}</div>
          </div>
          <div className="text-white text-lg lg:text-xl lg:leading-xxl text-center">
            {description}
          </div>
          <div className="flex justify-center">
            <Button>
              <div>Get Started</div>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
