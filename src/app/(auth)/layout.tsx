import HeroSlider from "@/components/features/home/Hero/HeroSlider/HeroSlider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
     return  (
     <div className="overflow-hidden relative h-screen w-screen">
        <HeroSlider />
        {children}
      </div>
     )
}