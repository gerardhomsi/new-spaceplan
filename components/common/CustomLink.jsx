import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export const CustomLink = ({ href, linkName, customCss }) => {
  return (
    <Link href={href} className={`max-w-sm whitespace-nowrap transition my-6 text-center py-2 px-10 hover:px-2 border-r-2 border-r-[#cd9a41] border-l-2 border-l-[#cd9a41] hover:border-2 hover:border-[#cd9a41] rounded mx-auto ${customCss}`}>
      --- {linkName} ---
    </Link>
  );
};

export const ServiceLink = ({ href, serviceName, directionLeft = false, customCss }) => (
  <div className={`group border-2 border-[#cd9a41] rounded-md px-4 py-2 hover:bg-blue-950 max-w-[18rem] hover:text-[#cd9a41] ${customCss}`}>
    <Link href={href} className={`flex items-center  justify-evenly gap-2 ${directionLeft && `flex-row-reverse`}`}>
      {directionLeft ? (
        <BsArrowLeft className="transition-transform duration-300 ease-in-out group-hover:-translate-x-2 text-center" />
      ) : (
        <BsArrowRight className="transition-transform duration-300 ease-in-out group-hover:-translate-x-2 text-center" />
      )}
      <span>{serviceName}</span>{" "}
    </Link>
  </div>
);
