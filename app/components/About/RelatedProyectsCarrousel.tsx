import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../css/About/relatedProyectsCarousel.module.css";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { stand_out_projects } from "@/app/constants/stand_out_projects";

gsap.registerPlugin(useGSAP);

const images = [
  "https://tympanus.net/Development/ConnectedGrid/img/14.jpg",
  "https://tympanus.net/Development/ConnectedGrid/img/15.jpg",
  "https://tympanus.net/Development/ConnectedGrid/img/16.jpg",
];

type Props = {};

const RelatedProyectsCarrousel = (props: Props) => {
  const [selectedStep, setSelectedStep] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageBandRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const clickHandler = contextSafe((number: number) => {
    let movement = "";
    let percentage = 0;

    if (number !== selectedStep) {
      movement = number > selectedStep ? "right" : "left";

      const maxNumber = Math.max(number, selectedStep);
      const minNumber = Math.min(number, selectedStep);

      percentage = (maxNumber - minNumber) * 32;

      setSelectedStep(number);
    }

    switch (movement) {
      case "right":
        gsap.to(imageBandRef.current, {
          x: `-=${percentage}%`,
          ease: "power1",
        });
        break;

      case "left":
        gsap.to(imageBandRef.current, {
          x: `+=${percentage}%`,
          ease: "power1",
        });
        break;

      default:
        console.log("nothing");
        break;
    }
  });

  return (
    <motion.div ref={containerRef} className={styles.main}>
      <motion.div className={styles.image_container}>
        <motion.div ref={imageBandRef} className={styles.image_wrapper}>
          {stand_out_projects.slice(0, 3).map((_, i) => (
            <span
              className={styles.single_image_container}
              onClick={() => clickHandler(i + 1)}
              key={i + 1}
            >
              {selectedStep == i + 1 && (
                <div className={styles.text_information_of_project}>
                  <p>{_.date}</p>
                  <h3
                    style={{
                      fontFamily: "graphie",
                      fontSize: "2rem",
                      fontWeight: "100",
                    }}
                  >
                    {_.title}
                  </h3>
                  <p style={{ textTransform: "uppercase" }}>{_.description}</p>
                </div>
              )}

              <img
                style={{ scale: `${selectedStep !== i + 1 ? "0.8" : "1"}` }}
                className={styles.image}
                alt=""
                src={_.image}
              />
            </span>
          ))}
        </motion.div>
      </motion.div>
      <motion.div className={styles.steps_container}>
        {new Array(images.length).fill("").map((_, i) => (
          <motion.div
            key={i + 1}
            onClick={() => clickHandler(i + 1)}
            style={{
              backgroundColor: `${selectedStep == i + 1 ? "grey" : "#3b3b3b"}`,
            }}
            className={`${styles.step} image_${i + 1}`}
          ></motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RelatedProyectsCarrousel;
