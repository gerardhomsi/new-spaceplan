import Link from "next/link";
import { TfiEmail } from "react-icons/tfi";
import { HiOutlinePhone } from "react-icons/hi2";

const Hero = () => {
  const linkClasses = "max-w-sm font-bold whitespace-nowrap transition py-2 px-4 text-center border-x-2 border-x-[#cd9a41] hover:border-x-[#032e83] hover:text-[#cd9a41] rounded";
  const titleClasses = "text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[5rem] font-bold my-10 text-center sm:flex sm:flex-col sm:items-center text-slate-200 leading-tight";
  const containerClasses = "secondaryColor relative flex flex-col items-center justify-between font-medium h-full";
  const sectionClasses = "relative h-full border-b-4 border-[#cd9a41]";
  const pClasses = "font-bold pr-4 text-blue-950 rounded-md";
  const iconClasses = "mr-2 text-[#cd9a41]";

  return (
    <section className={sectionClasses} rel="preload" style={{ backgroundImage: `url('/heroImage.webp')` }}>
      <div className="flex flex-col md:flex-row md:justify-evenly items-center gap-2 p-5 text-nowrap text-sm md:text-lg">
        <div className="flex items-center">
          <HiOutlinePhone className={iconClasses} />
          <p className={pClasses}>: 713 209-0009</p>
        </div>
        <div className="flex items-center">
          <TfiEmail className={iconClasses} />
          <p className={pClasses}>: El-Zabringo@hotmail.com</p>
        </div>
        <Link href="/#contact" className={linkClasses}>
          --- Contact Us ---
        </Link>
      </div>
      <div className={containerClasses}>
        <div className="flex pb-20 pt-4 md:pb-24 md:pt-16 items-center">
          <h1 className={`testTitle ${titleClasses}`}>
            <span className="block">CONSTRUCTING</span>
            <span className="block">WITH</span>
            <span className="block">INTEGRITY </span>
            <span className="block">&</span>
            <span className="block">INSIGHT</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
