import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/contact/main.module.css";

const Brief = () => {
  return (
    <motion.div className={`${styles.section} ${styles.section_2}`}>
      <motion.div>
        <p>¿Tienes un Brief?</p>
        <p>Contesta nuestro formulario y te contactaremos para tu proyecto.</p>
      </motion.div>
      <motion.div>
        <button>FORMULARIO</button>
        <button>Arrow</button>
      </motion.div>
    </motion.div>
  );
};

export default Brief;
