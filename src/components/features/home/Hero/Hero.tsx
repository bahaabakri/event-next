import { FC } from "react";
import HeroSlider from "./HeroSlider/HeroSlider";
import HeroContent from "./HeroContent/HeroContent";
import { getActiveHero } from "@/lib/server/hero";
import { API_BASE_URL } from "@/api.config";
const Hero: FC = async () => {
  const activeHero = await getActiveHero();

  return (
    <div className="overflow-hidden relative h-screen w-screen">
      <HeroSlider
        imagesPath={activeHero.images.map((el) => `${API_BASE_URL}${el.url}`)}
      />{" "}
      {/* Server Component*/}
      <HeroContent
        title={activeHero.title}
        description={activeHero.description}
      />{" "}
      {/* Client Component*/}
    </div>
  );
};
export default Hero;
