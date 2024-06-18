import React from "react";
import { motion } from "framer-motion";
import styles from "../css/footer.module.css";
import Title from "./title";

type Props = {};

const Footer = (props: Props) => {
  return (
    <motion.div className={`${styles.footer}`}>
      <motion.section className={`${styles.footer_flex}`}>
        {/* <motion.section>
        <Title
          text="VOIDXR"
          words={12}
        />
      </motion.section> */}
        <h2>VOIDXR</h2>

        <motion.section className={`${styles.questions}`}>
          <h4>¿Tienes una idea?</h4>
          <p>Cuentanos</p>
          <button>Let's Talk</button>
        </motion.section>
        <motion.section className={`${styles.social}`}>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Vimoe</p>
        </motion.section>
        <motion.section>Void XR</motion.section>
      </motion.section>
    </motion.div>
  );
};

export default Footer;
