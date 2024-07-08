import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/About/services.module.css";

type Props = {};

const Services = (props: Props) => {
  return (
    <motion.section className={styles.main}>
      <div>
        <h2 className={styles.title}>SERVICIOS</h2>
      </div>
      <div>
        <h3>Carousel</h3>
      </div>
    </motion.section>
  );
};

export default Services;
