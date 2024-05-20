import ContactForm from "./ContactForm";

const ContactUs = () => {
  const containerClasses = "w-full text-center flex flex-col items-center justify-center py-10 sm:p-10 gradientLight";
  const titleClasses = "text-[2.5rem] sm:text-6xl text-center underline underline-offset-8 decoration-2 decoration-[#cd9a41] textShadow mb-4";
  const linkClasses = "underline underline-offset-4 decoration-[#032e83] text-[#cd9a41]";

  return (
    <section id="contact" className={containerClasses}>
      <h2 className={titleClasses}>CONTACT US</h2>
      <h2 className="primaryColor flex flex-col gap-2">
        Please contact Us directly at:
        <a className={linkClasses} href="mailto:gerard.homsi@gmail.com">
          example@gmail.com
        </a>
        <p className="thirdColor">OR</p> through the form below:
      </h2>
      <ContactForm />
    </section>
  );
};

export default ContactUs;
