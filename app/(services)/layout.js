const layout = ({ children }) => {
  return (
    <section className="h-screen py-8 px-6 flex justify-center gradientBlue">
      <div className="text-center px-5 sm:px-10 md:w-2/3 border border-[#032e83] gradientLight">{children}</div>
    </section>
  );
};

export default layout;
