import Image from "next/image";

export const MissionStep = ({ title, subtitle, content, icon }) => (
  <div className={`flex flex-col items-start md:flex-row md:items-center justify-evenly gap-10 md:gap-16 leading-tight w-full`}>
    <div className="border-l-2 flex-1 border-[#cd9a41]">
      <h2 className="px-2 text-[3rem] lg:text-[4rem] xl:text-[6rem] font-semibold">
        {title}
        {subtitle.map((line, index) => (
          <p key={index} className="text-[1rem] italic secondaryColor font-medium whitespace-nowrap">
            {line}
          </p>
        ))}
      </h2>
    </div>
    <div className="flex-1 flex justify-center">
      <Image src={icon} width={140} height={50} alt="icon" />
    </div>
    <div className="flex-1">
      <h3 className="pl-2 border-l-2 border-[#cd9a41] text-[0.9rem] lg:text-[1rem] font-medium leading-7 lg:leading-6">{content}</h3>
    </div>
  </div>
);
