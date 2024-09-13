"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination, Autoplay } from "swiper/modules";
import useSlider from "./useSlider";

const SwiperComponent = () => {
  const { thumbsSwiper, setThumbsSwiper, handleSlideChange, projects, selectedProjectIndex } = useSlider();

  return (
    <div>
      <Swiper
        autoHeight
        loop
        lazy="true"
        className="rounded-lg"
        spaceBetween={10}
        onSlideChange={handleSlideChange}
        pagination={{ dynamicBullets: true }}
        modules={[Pagination, Thumbs, Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
      >
        {projects.map((image, index) => (
          <SwiperSlide key={index}>
            {index === selectedProjectIndex && (
              <div className="absolute flex flex-col justify-center items-start h-full w-1/2 px-4 bg-blue-950 bg-opacity-70 text-amber-500">
                <h1 className="font-bold pb-2 text-[1rem] sm:text-[2.5rem] lg:text-[2.9rem] xl:text-[3.6rem] text-white whitespace-nowrap">{projects[selectedProjectIndex].title}</h1>
                <p className="text-[0.6rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.3rem] sm:py-2">-{projects[selectedProjectIndex].address}</p>
                <ul className="text-[0.7rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.3rem] sm:py-2">
                  {projects[selectedProjectIndex].tags.map((tag, tagIndex) => (
                    <li key={tagIndex} className="mb-2">
                      -{tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Image
              src={image.imageUrl}
              width={0}
              height={0}
              alt={image.title}
              style={{
                height: "auto",
                width: "auto",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={14} slidesPerView={4} watchSlidesProgress={true} modules={[Navigation, Thumbs]} className="thumbs mt-4 w-full rounded-lg h-[6rem] sm:h-[8rem] md:h-[12rem] xl:h-[18rem]">
        {projects.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-full flex flex-col cursor-pointer">
              <Image src={image.imageUrl} alt={image.title} className="block h-full w-full object-cover rounded-xl" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
