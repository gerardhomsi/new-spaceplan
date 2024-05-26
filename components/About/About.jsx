const containerClasses = "px-2 py-4 md:p-10 mx-auto whitespace-pre-wrap text-left flex flex-col gap-8";
const highlightTextClasses = "text-[#cd9a41] text-[1.6rem]";

const About = () => {
  return (
    <section id="about" className="bg-blue-950 text-white sectionPadding text-center gradientBlue min-h-screen">
      <h2 className="text-[3.5rem] underline decoration-2 underline-offset-8 decoration-[#cd9a41] text-center py-10">ABOUT US</h2>
      <div className={containerClasses}>
        <p>
          <span className={highlightTextClasses}>SpacePlan Construction and Management LLC</span>, established in 2007, brings forth a wealth of expertise garnered over three decades in the design and construction domain. Our extensive portfolio
          boasts numerous successful commercial and residential endeavors across the vibrant landscape of <span className={highlightTextClasses}>Houston</span>.
        </p>
        <p>
          Distinguished by our commitment to excellence, we specialize in delivering comprehensive solutions, encompassing tenant improvements, new constructions, and residential remodels. Our holistic approach spans from conceptualization to
          completion, offering a seamless experience for our clients. From initial design concepts to detailed construction drawings, and from budgetary estimations to managing permits and overseeing construction activities,{" "}
          <span className={highlightTextClasses}>SpacePlan</span> ensures a meticulous and streamlined process at every stage of the project.
        </p>
      </div>
    </section>
  );
};

export default About;
