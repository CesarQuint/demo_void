import React from "react";
import { motion } from "framer-motion";
import styles from "../css/footer.module.css";
import Title from "./title";
import TypedLink from "./TypedLink/TypedLink";
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
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/frammer_main"
                onClick={(e) => {
                  // goTo(e, "/frammer_main");
                }}>
                HOME
              </TypedLink>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/frammer_main"
                onClick={(e) => {
                  // goTo(e, "/frammer_main");
                }}>
                PROJECTS
              </TypedLink>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/frammer_main"
                onClick={(e) => {
                  // goTo(e, "/frammer_main");
                }}>
                STUDIO
              </TypedLink>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/frammer_main"
                onClick={(e) => {
                  // goTo(e, "/frammer_main");
                }}>
                CONTACT
              </TypedLink>
            </nav>
          </motion.div>
          <motion.div className={`${styles.flex_container}  ${styles.social}`}>
            <p>SOCIAL</p>
            <nav className={`${styles.links}`}>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/frammer_main"
                onClick={(e) => {
                  // goTo(e, "/frammer_main");
                }}>
                INSTAGRAM
              </TypedLink>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/frammer_main"
                onClick={(e) => {
                  // goTo(e, "/frammer_main");
                }}>
                FACEBOOK
              </TypedLink>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/frammer_main"
                onClick={(e) => {
                  // goTo(e, "/frammer_main");
                }}>
                VIDEO
              </TypedLink>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/frammer_main"
                onClick={(e) => {
                  // goTo(e, "/frammer_main");
                }}>
                LINKEDIN
              </TypedLink>
            </nav>
          </motion.div>
        </motion.section>
      </motion.section>
    </motion.div>
  );
};

export default Footer;
