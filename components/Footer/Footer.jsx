import Link from "next/link";
import Image from "next/image";

import { logo, socialLinks } from "./constants";

const Footer = () => {
  return (
    <footer className="footerBackground p-4 flex justify-between text-[#cd9a41]">
      <div className="flex flex-col gap-5 md:gap-7 lg:gap-9 xl:gap-12">
        {socialLinks.map((link, index) => (
          <Link key={index} className="text-base sm:text-3xl md:text-4xl" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.icon}
          </Link>
        ))}
      </div>
      <div className="flex flex-col justify-center">
        <Link href="/">
          <Image src={logo} width={195} height={100} alt="logo" className="ml-auto md:w-full" />
        </Link>
        <p className="text-center text-[0.55rem] md:text-[0.92rem] font-bold">&copy; {new Date().getFullYear()} SpacePlanCM | All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
