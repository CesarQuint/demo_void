import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/contact/main.module.css";

const Brief = () => {
  return (
    <motion.div className={`${styles.section} ${styles.section_2}`}>
      <motion.div className={styles.description}>
        <p className={styles.title}>¿Tienes un Brief?</p>
        <p className={styles.text}>
          Contesta nuestro formulario y te contactaremos para tu proyecto.
        </p>
      </motion.div>
      <motion.div className={styles.buttons_wrapper}>
        <button className={styles.button_1}>FORMULARIO</button>
        <button className={styles.button_2}>-</button>
      </motion.div>
    </motion.div>
  );
};

export default Brief;
