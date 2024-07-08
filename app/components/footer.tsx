import React from "react";
import { motion } from "framer-motion";
import styles from "../css/footer.module.css";
import Title from "./title";
import Link from "next/link";
import useTime from "../utils/hooks/useTime";

type Props = {};

const Footer = (props: Props) => {
  const time = useTime();

  return (
    <motion.div className={`${styles.footer}`}>
      <motion.section className={`${styles.footer_flex}`}>
        <motion.section style={{ width: "100%" }}>
          <Title />
        </motion.section>

        <motion.section className={` ${styles.text_container}`}>
          <motion.div className={`${styles.flex_container}  ${styles.concat}`}>
            <div className={`${styles.contact_button_area_wrapper}`}>
              <p>¿Quieres empezar un nuevo proyecto?</p>
              <section className={`${styles.about_buttons}`}>
                <button className={`${styles.btn_1}`}>ESCRIBENOS</button>
                <button className={`${styles.btn_2}`}>+</button>
              </section>
            </div>
            <p>+52 55 3245 2323</p>
            <p>CONTACTO@VOIDXR.STUDIO</p>
          </motion.div>
          <motion.div
            className={`${styles.flex_container}  ${styles.information}`}>
            <p>{time}</p>
            <p>
              Watteau 35, 03700
              <br /> Ciudad de México,
              <br /> CDMX
            </p>
            <p>Void XR 2024®</p>
          </motion.div>
          <motion.div className={`${styles.flex_container}  ${styles.nav}`}>
            <p>NAVIGATION</p>
            <nav className={`${styles.links}`}>
              <Link href={"/"}>HOME</Link>
              <Link href={"/"}>PROJECT</Link>
              <Link href={"/"}>STUDIO</Link>
              <Link href={"/"}>CONTACT</Link>
            </nav>
          </motion.div>
          <motion.div className={`${styles.flex_container}  ${styles.social}`}>
            <p>SOCIAL</p>
            <nav className={`${styles.links}`}>
              <Link href={"/"}>INSTAGRAM</Link>
              <Link href={"/"}>FACEBOOK</Link>
              <Link href={"/"}>VIDEO</Link>
              <Link href={"/"}>LINKEDIN</Link>
            </nav>
          </motion.div>
        </motion.section>
      </motion.section>
    </motion.div>
  );
};

export default Footer;
