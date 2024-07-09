import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/About/services.module.css";
import RelatedProyectsCarrousel from "./RelatedProyectsCarrousel";

type Props = {};

const Services = (props: Props) => {
  return (
    <motion.section className={styles.main}>
      <div>
        <h2 className={styles.title}>SERVICIOS</h2>
      </div>
      <div>
        <h3>Proyectos relacionados</h3>
      </div>
      {/* <RelatedProyectsCarrousel /> */}
    </motion.section>
  );
};

export default Services;
