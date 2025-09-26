import BackgroundSlider from "@/components/ui/BackgroundSlider/BackgroundSlider";
import { API_BASE_URL } from "@/api.config";
import { getActiveHero } from "@/lib/server/hero";

export default async function HeroSlider() {
  const activeHero = await getActiveHero();
  return (
    <BackgroundSlider
      imagesPath={activeHero.images.map((el) => `${API_BASE_URL}${el.url}`)}
    />
  );
};