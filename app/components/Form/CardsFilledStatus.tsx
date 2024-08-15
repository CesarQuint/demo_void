import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/Form/form_status.module.css";

const CardsFilledStatus = () => {
  return (
    <motion.div className={styles.main}>
      <motion.section className={styles.status_flex}>
        {new Array(11).fill("").map((_, i) => (
          <div key={i} className={styles.number}>
            -{i}-
          </div>
        ))}
      </motion.section>
    </motion.div>
  );
};

export default CardsFilledStatus;
