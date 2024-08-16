import React, { useEffect, useState, useRef } from "react";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import styles from "../../css/Horizontal/carousel.module.css";
import { stand_out_projects } from "@/app/constants/stand_out_projects";

gsap.registerPlugin(Draggable);

const imageUrl =
  "https://img.freepik.com/free-photo/sunset-silhouettes-trees-mountains-generative-ai_169016-29371.jpg";

const CarouselCaseStudy: React.FC = () => {
  const images = new Array(5).fill(imageUrl); // Assuming 5 thumbnails
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Draggable
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
    const thumbnails = thumbnailsRef.current?.querySelectorAll(".thumbnail");
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
      <div className={styles.main_image}>
        <img src={selectedImage} alt="Selected" />
      </div>
      <div className={styles.thumbnails} ref={thumbnailsRef}>
        {stand_out_projects.map((image, index) => (
          <img
            key={index}
            src={image.image}
            alt={`Thumbnail ${index + 1}`}
            className={styles.thumbnail}
            onClick={() => setSelectedImage(image.image)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselCaseStudy;
