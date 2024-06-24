import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/projects.module.css";
import CardImg from "../CardImg/CardImg";
import ScrollImg from "../ScrollImg/ScrollImg";

type Props = {};

const ProjectImages = (props: Props) => {
  const images = [
    "https://tympanus.net/Development/ConnectedGrid/img/14.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/15.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/16.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/17.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/18.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/19.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/20.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/21.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/22.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/23.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/24.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/25.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/26.jpg",
  ];

  return (
    <motion.div className={`${styles.project_container}`}>
      <motion.section className={`${styles.project_wrapper}`}>
        <h3 className={`${styles.title}`}>PROYECTOS DESTACADOS</h3>
        <div className={styles.scrollView}>
          {images.map((src, i) => (
            <ScrollImg
              key={i}
              src={src}
              fill
              sizes="50%"
              isLeftSide={!(i % 2)}
              alt="example"
              title="Raíces lumínicas"
              caption="Instalación visual en el bosque"
            />
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ProjectImages;
