import dynamic from "next/dynamic";

import Hero from "@/components/Hero/Hero";
import Team from "@/components/Team/Team";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import ContactUs from "@/components/ContactUs/ContactUs";
import OurMission from "@/components/Ourmission/Ourmission";

const DynamicSlider = dynamic(() => import("@/components/Slider/Slider"));

export default function Home() {
  return (
    <main className="min-h-screen gradientLight">
      <Hero />
      <About />
      <OurMission />
      <DynamicSlider />
      <Services />
      <Team />
      <ContactUs />
    </main>
  );
}
