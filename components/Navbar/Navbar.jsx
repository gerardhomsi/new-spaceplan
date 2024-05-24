"use client";

import Link from "next/link";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";

import useNavbar from "./useNavbar";

const Navbar = () => {
  const { isOpen, toggleMenu, navigationLinks, logo } = useNavbar();

  return (
    <nav className={`flex items-center p-3 gap-4 border-b-4 border-[#cd9a41] font-medium gradientLight sticky top-0 z-10`}>
      <Link rel="preload" href="/" smooth="true" type="image/png">
        <Image src={logo} priority alt="banner" width={370} height={0} quality={90} style={{ width: "auto", height: "auto" }} />
      </Link>
      <div className="sm:hidden ml-auto">
        <button onClick={toggleMenu} className={`text-3xl ${!isOpen ? "text-[#032e83]" : "text-red-600 border border-red-500 rounded-full"}`}>
          {isOpen ? <MdOutlineClose /> : <HiMenu />}
        </button>
      </div>

      <div className={`flex gap-1 sm:gap-2 sm:ml-auto md:gap-4 lg:gap-10 xl:gap-16 ${isOpen ? "flex-col" : "hidden sm:flex"} text-[1rem] lg:text-[1.2rem]`}>
        {navigationLinks.map((link, index) => (
          <Link key={index} href={link.href} smooth="true" className={"transition hover:text-[#cd9a41] hover:underline decoration-[#032e83] hover:decoration-2 underline-offset-4"}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
