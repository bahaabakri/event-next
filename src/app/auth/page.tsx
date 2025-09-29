import Auth from "@/components/features/auth/Auth/Auth";
import HeroSlider from "@/components/features/home/Hero/HeroSlider/HeroSlider";
// import { getActiveHero } from "@/lib/server/hero";

export default function AuthPage() {
  // const activeHero = await getActiveHero();
  return (
    <div className="overflow-hidden relative h-screen w-screen">
      <HeroSlider />
      <Auth />
    </div>
  );
}
