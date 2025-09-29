import { FC } from "react";
import HeroSlider from "./HeroSlider/HeroSlider";
import HeroContent from "./HeroContent/HeroContent";
const Hero: FC = () => {
  return (
    <div className="overflow-hidden relative h-screen w-screen">
      <HeroSlider /> {/* Server Component*/}
      <HeroContent /> {/* Client Component*/}
    </div>
  );
};

export default Hero;
