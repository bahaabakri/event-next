import Hero from "@/components/features/home/Hero/Hero";
import { getActiveHero } from "@/lib/server/hero";

export default async function HomePage () {
  const activeHero = await getActiveHero();
  return (
    <Hero  activeHero={activeHero}/>
  );
}