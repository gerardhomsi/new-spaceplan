"use client";
import Image from "next/image";
import styles from "./GalleryPage.module.css";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import useProjectModal from "./useProjectModal";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";

const Gallery = ({ projects }) => {
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { selectedProject, setSelectedProject, handleCloseModal } = useProjectModal();

  useEffect(() => {
    setLoading(false);
  }, [projects]);

  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.title}>Gallery</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.gridContainer}>
          {projects.map((project) => (
            <div key={project._id} className={styles.projectContainer}>
              <h2 className={styles.projectTitle}>{project.projectName}</h2>
              <div onClick={() => setSelectedProject(project)} className={styles.imageContainer}>
                <Image width={500} height={200} priority style={{ width: "500px", height: "auto" }} src={project.downloadUrls[0]} alt={`Image 1`} className="h-full" />
              </div>
              <div className={styles.projectDescription}>
                <p>
                  <span className={styles.locationText}>Location:</span>
                  <span className={styles.locationValue}>{project.location}</span>
                </p>
                <p>
                  <span className={styles.descriptionText}>Description:</span>
                  <span className={styles.descriptionValue}>{project.description}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProject && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <p className={styles.modalTitle}>{selectedProject.projectName}</p>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                Close
              </button>
            </div>
            <Swiper
              loop={true}
              lazy={"true"}
              spaceBetween={10}
              pagination={{ dynamicBullets: true }}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[Pagination, Thumbs, Navigation]}
              className={styles.swiperContainer}
            >
              {selectedProject.downloadUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.slideContainer}>
                    <Image loading="lazy" width={900} height={600} src={url} alt={`Image ${index + 1}`} className={styles.slideImage} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{ 375: { slidesPerView: 3, spaceBetween: 10 }, 640: { slidesPerView: 4, spaceBetween: 20 }, 1500: { slidesPerView: 5, spaceBetween: 40 } }}
              autoHeight={true}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
            >
              {selectedProject.downloadUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.thumbnailContainer}>
                    <Image loading="lazy" width={250} height={100} src={url} alt={`Thumbnail ${index + 1}`} className={styles.thumbnailImage} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
