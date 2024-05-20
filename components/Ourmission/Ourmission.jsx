import { missionSteps } from "./constants";
import { MissionStep } from "./MissionStep";

const OurMission = () => {
  const missionClass = "p-8 pb-32 lg:px-24 xl:px-32 h-full flex flex-col items-center gap-28 border-t-4 border-[#cd9a41]";
  const missionH1 = "underline underline-offset-8 decoration-2 text-[3.5rem] sm:text-[4rem] md:text-[6rem] decoration-[#cd9a41] text-center whitespace-nowrap md:mb-10 ";

  return (
    <section id="ourMission" className={missionClass}>
      <h1 className={missionH1}>Our Mission</h1>
      {missionSteps.map((step, index) => (
        <MissionStep key={index} {...step} isSpecial={index === 1} thirdService={index === 2} />
      ))}
    </section>
  );
};

export default OurMission;
