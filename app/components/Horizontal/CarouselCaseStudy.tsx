import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { motion } from "framer-motion";
import styles from "../../css/Horizontal/carousel.module.css";
import { stand_out_projects } from "@/app/constants/stand_out_projects";

gsap.registerPlugin(Draggable);

const CarouselCaseStudy: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(
    stand_out_projects[0].image
  );
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Draggable setup
    Draggable.create(thumbnailsRef.current, {
      type: "x",
      bounds: thumbnailsRef.current,
      inertia: true,
      onDragEnd: function () {
        const closestThumbnail = getClosestThumbnail();
        if (closestThumbnail) {
          setSelectedImage(closestThumbnail.src);
        }
      },
    });
  }, []);

  const getClosestThumbnail = () => {
    const thumbnails = thumbnailsRef.current?.querySelectorAll(
      `.${styles.thumbnail}`
    );
    let closest = null;
    let closestDistance = Number.MAX_VALUE;
    const centerX = window.innerWidth / 2;

    thumbnails?.forEach((thumbnail) => {
      const rect = thumbnail.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - centerX);
      if (distance < closestDistance) {
        closest = thumbnail;
        closestDistance = distance;
      }
    });

    return closest as HTMLImageElement | null;
  };

  return (
    <div className={styles.carousel_container}>
      <motion.div
        className={styles.main_image}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={selectedImage} alt="Selected" />
      </motion.div>
      <motion.div
        className={styles.thumbnails}
        ref={thumbnailsRef}
        drag="x"
        dragConstraints={thumbnailsRef}
        dragElastic={0.1}
        whileTap={{ cursor: "grabbing" }}
      >
        {stand_out_projects.map((image, index) => (
          <motion.img
            key={index}
            src={image.image}
            alt={`Thumbnail ${index + 1}`}
            className={styles.thumbnail}
            onClick={() => setSelectedImage(image.image)}
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CarouselCaseStudy;
