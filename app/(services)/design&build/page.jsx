import { ServiceLink } from "@/components/common/CustomLink";

const page = () => {
  return (
    <div className="h-full flex flex-col justify-evenly mx-auto">
      <h2 className="text-[2rem] underline decoration-2 underline-offset-8 decoration-[#cd9a41] text-center textShadow">DESIGN & BUILD</h2>
      <h3 className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, soluta ducimus exercitationem voluptatem libero nulla, earum dolor nesciunt illum quidem ea deserunt ipsam facilis nemo eaque non dolores fugiat voluptatibus aliquam esse natus,
        autem voluptates? Eligendi sit aperiam repellendus, laborum dolorem corporis necessitatibus architecto ullam excepturi officia doloribus, veniam voluptas?
      </h3>
      <div className="flex flex-col sm:flex sm:flex-row justify-between items-center gap-10 whitespace-nowrap">
        <ServiceLink href={"/pre-construction"} directionLeft serviceName={"PRE-CONSTRUCTION"} />
        <ServiceLink href={"/construction"} serviceName={"CONSTRUCTION"} customCss={""} />
      </div>
    </div>
  );
};

export default page;
