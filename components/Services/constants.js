import constructionIcon from "../../public/construct.png";
import designIcon from "../../public/design-build.png";
import icon1 from "../../public/preconstruction.png";

export const services = [
  {
    title: "PRE-CONSTRUCTION",
    icon: icon1,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quasi.",
    link: "/pre-construction",
    borderClass: "border-l-4 border-[#cd9a41] px-5 lg:border-0",
  },
  {
    title: "DESIGN & BUILD SERVICES",
    icon: designIcon,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quasi.",
    link: "/design&build",
    borderClass: "border-r-4 border-[#cd9a41] px-5 lg:border-l-4 lg:border-r-0",
  },
  {
    title: "CONSTRUCTION SERVICES",
    icon: constructionIcon,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quasi.",
    link: "/construction",
    borderClass: "border-l-4 border-[#cd9a41] px-5",
  },
];
