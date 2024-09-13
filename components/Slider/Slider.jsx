import { CustomLink } from "../common/CustomLink";
import SwiperComponent from "./SwiperComponent";

export default function Slider() {
  return (
    <section id="projects" className="flex flex-col items-center min-h-screen gradientBlue gap-6 border-b-4 border-t-4 border-[#cd9a41]">
      <h2 className="text-[3.5rem] sm:text-[4rem] text-white underline underline-offset-8 decoration-2 decoration-[#cd9a41]">PROJECTS</h2>
      <div className="w-[90%] sm:w-[75%] xl:p-20">
        <SwiperComponent />
      </div>
      <CustomLink href={"/gallery"} linkName={"View Gallery"} customCss={"text-white"} />
    </section>
  );
}
