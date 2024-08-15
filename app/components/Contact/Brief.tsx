import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/contact/main.module.css";
import Image from "next/image";
import wArrow from "../../../public/images/arrow.svg";
import { useRouter } from "next/navigation";
import { useNavigation } from "@/app/utils/navigationContext";

const Brief = () => {
  const { setNavigationEvent } = useNavigation();

  function goTo() {
    setNavigationEvent({ state: true, href: "/form" });
  }

  return (
    <motion.div className={`${styles.section} ${styles.section_2}`}>
      <motion.div className={styles.description}>
        <p className={styles.title}>¿Tienes un Brief?</p>
        <p className={styles.text}>
          Contesta nuestro formulario y te contactaremos para tu proyecto.
        </p>
      </motion.div>
      <motion.div className={styles.buttons_wrapper}>
        <button onClick={(e) => goTo()} className={styles.button_1}>
          FORMULARIO
        </button>
        <button onClick={(e) => goTo()} className={styles.button_2}>
          <Image
            className={styles.arrow_button}
            width={1000}
            height={1000}
            src={wArrow}
            alt="arrow"
          />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Brief;
