import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../css/About/relatedProyectsCarousel.module.css";
import Image from "next/image";
import gsap from "gsap";

const images = [
  "https://tympanus.net/Development/ConnectedGrid/img/14.jpg",
  "https://tympanus.net/Development/ConnectedGrid/img/15.jpg",
  "https://tympanus.net/Development/ConnectedGrid/img/16.jpg",
];

type Props = {};

const RelatedProyectsCarrousel = (props: Props) => {
  const [selectedStep, setSelectedStep] = useState(1);
  return (
    <motion.div className={styles.main}>
      <motion.div className={styles.image_container}>
        <motion.div className={styles.image_wrapper}>
          {images.map((_, i) => (
            <Image
              width={1000}
              height={1000}
              className={styles.image}
              key={i}
              alt=""
              src={_}
            />
          ))}
        </motion.div>
      </motion.div>
      <motion.div className={styles.steps_container}>
        {new Array(3).fill("").map((_, i) => (
          <motion.div
            key={i}
            style={{
              backgroundColor: `${selectedStep == i ? "grey" : "#3b3b3b"}`,
            }}
            className={styles.step}></motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RelatedProyectsCarrousel;
