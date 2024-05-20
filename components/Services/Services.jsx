import Service from "./Service";
import { services } from "./constants";

const Services = () => {
  const titleClass = "underline underline-offset-8 decoration-2 decoration-[#cd9a41]  text-[1.9rem]";
  const flexColCenter = "flex flex-col justify-center items-center";

  return (
    <section id="services" className={`${flexColCenter} gap-16 sectionPadding sm:sectionPadding gradientLight min-h-screen`}>
      <h2 className={`text-[3.5rem] sm:text-[4rem] text-center ${titleClass}`}>SERVICES</h2>
      <div className={`${flexColCenter} lg:flex lg:flex-row lg:gap-20 gap-16 text-center lg:h-[40rem]`}>
        {services.map((service, index) => (
          <Service key={index} title={service.title} icon={service.icon} description={service.description} link={service.link} borderClass={service.borderClass} />
        ))}
      </div>
    </section>
  );
};

export default Services;
