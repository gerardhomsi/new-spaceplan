// components/Service.js
import Image from "next/image";
import { CustomLink } from "../common/CustomLink";

const Service = ({ title, icon, description, link, borderClass }) => {
  const flexColCenter = "flex flex-col justify-center items-center";
  const subTitleClass = " text-[1.9rem]";

  return (
    <div className={`${flexColCenter} ${borderClass} w-full gap-10`}>
      <h2 className={subTitleClass}>{title}</h2>
      <Image src={icon} width={90} height={90} alt={title} />
      <h2>{description}</h2>
      <CustomLink href={link} linkName="Learn More" />
    </div>
  );
};

export default Service;
