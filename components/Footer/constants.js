import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";

export const logo = "https://firebasestorage.googleapis.com/v0/b/spaceplancm-396f1.appspot.com/o/website%20stuff%2FfooterLogo.png?alt=media&token=964d38ca-429c-4732-b874-6d17e904836a";

const socialLinksStyles = "sm:text-3xl md:text-4xl";

export const socialLinks = [
  { href: "https://facebook.com", icon: <FaFacebookSquare className={socialLinksStyles} /> },
  { href: "https://instagram.com", icon: <FaInstagram className={socialLinksStyles} /> },
  { href: "https://twitter.com", icon: <FaTwitter className={socialLinksStyles} /> },
];
