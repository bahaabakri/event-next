import BackgroundSlider from "@/components/ui/BackgroundSlider/BackgroundSlider";

type HeroSliderProps = {
  imagesPath: string[];
};
export default function HeroSlider({ imagesPath }: HeroSliderProps) {
  return (
    <BackgroundSlider
      imagesPath={imagesPath}
    />
  );
};