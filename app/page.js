import Hero from "@/components/Hero/Hero";
import Team from "@/components/Team/Team";
import About from "@/components/About/About";
import Slider from "@/components/Slider/Slider";
import Services from "@/components/Services/Services";
import ContactUs from "@/components/ContactUs/ContactUs";
import OurMission from "@/components/Ourmission/Ourmission";

export default function Home() {
  return (
    <main className="min-h-screen gradientLight">
      <Hero />
      <About />
      <OurMission />
      <Slider />
      <Services />
      <Team />
      <ContactUs />
    </main>
  );
}
