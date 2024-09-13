import { Toaster } from "react-hot-toast";
import { Montserrat } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "SpacePlanCM",
  description: "Leading Construction and Management LLC offering pre-construction, design & build, and construction services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {/* <Toaster /> */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
