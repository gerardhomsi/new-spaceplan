import { useState } from "react";

import heroImage1 from "../../public/heroImage1.jpg";
import heroImage2 from "../../public/heroImage2.jpg";
import heroImage3 from "../../public/heroImage3.jpg";
import heroImage4 from "../../public/heroImage4.jpg";
import heroImage5 from "../../public/heroImage5.jpg";
import heroImage6 from "../../public/heroImage6.jpg";

const useSlider = () => {
  const projects = [
    { title: `Abdallah's Bakery`, address: "6300 Westpark suite 485, Houston, TX 77057", tags: ["Bakery - Mediterranean Food", "2200 sq ft", "Design/Build -Completed June 2008"], imageUrl: heroImage1 },
    { title: "Allday Dental", address: "8619 Richmond Ave. suite 700 Houston, Texas 77063", tags: ["Dental Clinic", "2200 sq ft", "Design/Build -Completed June 2008"], imageUrl: heroImage2 },
    { title: "Mattress EXPO", address: "15890 Southwest Freeway suite 100 Sugar Land, Texas 77478", tags: ["Retail - Mattresses", "3195 sq ft", "Design/Build - Completed August 2008"], imageUrl: heroImage3 },
    { title: "TESTsafsdd", address: "15890 Southwest Freeway suite 100 Sugar Land, Texas 77478", tags: ["Retail - Mattresses", "3195 sq ft", "Design/Build - Completed August 2008"], imageUrl: heroImage4 },
    { title: "aaaaaaaaaa", address: "15890 Southwest Freeway suite 100 Sugar Land, Texas 77478", tags: ["Retail - Mattresses", "3195 sq ft", "Design/Build - Completed August 2008"], imageUrl: heroImage5 },
    { title: "bbbbbbb", address: "15890 Southwest Freeway suite 100 Sugar Land, Texas 77478", tags: ["Retail - Mattresses", "3195 sq ft", "Design/Build - Completed August 2008"], imageUrl: heroImage6 },
  ];

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleSlideChange = (swiper) => setSelectedProjectIndex(swiper.realIndex);

  return { thumbsSwiper, projects, selectedProjectIndex, setThumbsSwiper, handleSlideChange };
};

export default useSlider;
