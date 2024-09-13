import { useState } from "react";

const useNavbar = () => {
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#services", label: "Services" },
    { href: "/#team", label: "Team" },
    { href: "/#contact", label: "Contact" },
  ];

  const logo = "https://firebasestorage.googleapis.com/v0/b/spaceplancm-396f1.appspot.com/o/website%20stuff%2Fspbanner.png?alt=media&token=c58ca322-c26f-47f9-80e6-be60156a66c2";

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return { isOpen, toggleMenu, navigationLinks, logo };
};

export default useNavbar;
