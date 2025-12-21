import BackgroundSlider from "@/components/ui/BackgroundSlider/BackgroundSlider";
import { API_BASE_URL } from "@/api.config";
import { getActiveHero } from "@/lib/server/hero";
import BannerSwiper from "@/components/ui/BannerSwipper/BannerSwipper";

export default async function EventsSwiper() {
  const activeHero = await getActiveHero();
  return (
    <BannerSwiper
      imagesPath={activeHero.images.map((el) => `${API_BASE_URL}${el.url}`)}
    />
  );
};