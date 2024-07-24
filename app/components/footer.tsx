import React from "react";
import { motion } from "framer-motion";
import styles from "../css/footer.module.css";
import Title from "./title";
// import Timer from "./Timer";
import dynamic from "next/dynamic";
import { useNavigation } from "../utils/navigationContext";
import { useRouter } from "next/navigation";

const Timer = dynamic(() => import("./Timer"), { ssr: false });

const TypedLink = dynamic(() => import("./TypedLink/TypedLink"), {
  ssr: false,
});

type Props = {};

const Footer = (props: Props) => {
  const { setNavigationEvent } = useNavigation();
  const router = useRouter();

  function goTo(
    e: React.MouseEvent<HTMLAnchorElement | MouseEvent>,
    href: string
  ) {
    e.preventDefault();

    setNavigationEvent({ state: true, href });
  }

  return (
    <motion.div className={`${styles.footer}`}>
      <motion.section className={`${styles.footer_flex}`}>
        <motion.section style={{ width: "100%" }}>
          <Title />
        </motion.section>

        <motion.section className={` ${styles.text_container}`}>
          <motion.div className={`${styles.flex_container}  ${styles.contact}`}>
            <div className={`${styles.contact_button_area_wrapper}`}>
              <p>¿Quieres empezar un nuevo proyecto?</p>
              <section className={`${styles.about_buttons}`}>
                <button className={`${styles.btn_1}`}>ESCRIBENOS</button>
                <button className={`${styles.btn_2}`}>+</button>
              </section>
            </div>
            <a href="mailto:CONTACTO@VOIDXR.STUDIO">CONTACTO@VOIDXR.STUDIO</a>
          </motion.div>
          <motion.div
            className={`${styles.flex_container}  ${styles.information}`}
          >
            <Timer />
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
                href="/"
                onClick={(e) => {
                  goTo(e, "/");
                }}
              >
                HOME
              </TypedLink>
              {/* <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/frammer_main"
                onClick={(e) => {
                  // goTo(e, "/frammer_main");
                }}
              >
                PROJECTS
              </TypedLink> */}
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/about"
                onClick={(e) => {
                  goTo(e, "/about");
                }}
              >
                STUDIO
              </TypedLink>
              {/* <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/frammer_main"
                onClick={(e) => {
                  // goTo(e, "/frammer_main");
                }}
              >
                CONTACT
              </TypedLink> */}
            </nav>
          </motion.div>
          <motion.div className={`${styles.flex_container}  ${styles.social}`}>
            <p>SOCIAL</p>
            <nav className={`${styles.links}`}>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="https://www.instagram.com/voidxr.studio?igsh=cDg5MzhmZ2V1ZGRq"
              >
                INSTAGRAM
              </TypedLink>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="https://www.facebook.com/voidxr.studio/"
              >
                FACEBOOK
              </TypedLink>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="https://www.tiktok.com/@voidxr.studio?_t=8ny8X7FJlEj&_r=1"
              >
                TIKTOK
              </TypedLink>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="https://www.linkedin.com/company/voidxr/"
              >
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
