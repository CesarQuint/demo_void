import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../css/footer.module.css";
import dynamic from "next/dynamic";
import { useNavigation } from "../utils/navigationContext";

const Title = dynamic(() => import("./title"), { ssr: false });
const Timer = dynamic(() => import("./Timer"), { ssr: false });

const TypedLink = dynamic(() => import("./TypedLink/TypedLink"), {
    ssr: false,
});
import NavButton from "./buttons/NavButton";

type Props = { state?: boolean };

const Footer = (props: Props) => {
    const { setNavigationEvent } = useNavigation();

    function goTo(
        e: React.MouseEvent<HTMLAnchorElement | MouseEvent>,
        href: string,
    ) {
        e.preventDefault();

        setNavigationEvent({ state: true, href });
    }

    useEffect(() => {}, [props.state]);

    return (
        <motion.div className={`${styles.footer}`}>
            <motion.section className={`${styles.footer_flex}`}>
                <motion.section style={{ width: "100%" }}>
                    <Title iterations={8} />
                </motion.section>

                <motion.section className={` ${styles.text_container}`}>
                    <motion.div
                        className={`${styles.flex_container}  ${styles.contact}`}
                    >
                        <div
                            className={`${styles.contact_button_area_wrapper}`}
                        >
                            <p style={{ textTransform: "uppercase" }}>
                                ¿Quieres empezar un nuevo proyecto?
                            </p>
                            <section className={`${styles.about_buttons}`}>
                                <NavButton href="/contact" text="ESCRÍBENOS" />
                            </section>
                        </div>
                        <a href="mailto:CONTACTO@VOIDXR.STUDIO">
                            CONTACTO@VOIDXR.STUDIO
                        </a>
                    </motion.div>
                    <motion.div
                        className={`${styles.flex_container}  ${styles.information}`}
                    >
                        <div
                            className={`${styles.contact_button_area_wrapper}`}
                        >
                            <Timer />
                            <p>
                                Watteau 35, 03700
                                <br /> Ciudad de México,
                                <br /> CDMX
                            </p>
                        </div>
                        <p>Void XR 2024®</p>
                    </motion.div>
                    <motion.div
                        className={`${styles.flex_container}  ${styles.nav}`}
                    >
                        <div
                            className={`${styles.contact_button_area_wrapper}`}
                        >
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
                                <TypedLink
                                    viewAnimate={true}
                                    hoverAnimate={false}
                                    href="/projects"
                                    onClick={(e) => {
                                        goTo(e, "/projects");
                                    }}
                                >
                                    PROJECTS
                                </TypedLink>
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

                                <TypedLink
                                    viewAnimate={true}
                                    hoverAnimate={false}
                                    onClick={(e) => {
                                        goTo(e, "/contact");
                                    }}
                                    href="/contact"
                                >
                                    CONTACT
                                </TypedLink>
                            </nav>
                        </div>
                    </motion.div>
                    <motion.div
                        className={`${styles.flex_container}  ${styles.social}`}
                    >
                        <div
                            className={`${styles.contact_button_area_wrapper}`}
                        >
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
                                    href="https://youtube.com/@voidxr_studio?si=5F3lHRRPmKbrZihn"
                                >
                                    YOUTUBE
                                </TypedLink>

                                <TypedLink
                                    viewAnimate={true}
                                    hoverAnimate={false}
                                    href="https://vimeo.com/voidxr"
                                >
                                    VIMEO
                                </TypedLink>
                                <TypedLink
                                    viewAnimate={true}
                                    hoverAnimate={false}
                                    href="https://www.linkedin.com/company/voidxr/"
                                >
                                    LINKEDIN
                                </TypedLink>
                            </nav>
                        </div>
                    </motion.div>
                </motion.section>
            </motion.section>
        </motion.div>
    );
};

export default Footer;
