"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import styles from "../css/preFooterLink.module.css";
import { useGSAP } from "@gsap/react";
import { useNavigation } from "../utils/navigationContext";

type Props = {
  text: string;
  href: string;
};

const PreFooterLink = (props: Props) => {
  const arrowOne = useRef<HTMLDivElement>(null);
  const arrowTwo = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setNavigationEvent } = useNavigation();

  const { contextSafe } = useGSAP({ scope: containerRef });

  function goTo(href: string) {
    setNavigationEvent({ state: true, href });
  }

  const hoverHandler = contextSafe(() => {
    if (arrowOne.current !== null && arrowTwo.current !== null) {
      gsap.to(arrowOne.current, {
        top: "-4rem",
        left: "4rem",
        duration: 0.01,
      });
      gsap.to(arrowTwo.current, {
        top: "0rem",
        right: "0rem",
        duration: 0.01,
      });
    }
  });

  const hoverOutHandler = contextSafe(() => {
    if (arrowOne.current !== null && arrowTwo.current !== null) {
      gsap.to(arrowOne.current, {
        top: "0",
        left: "0",
        duration: 0.01,
      });
      gsap.to(arrowTwo.current, {
        top: "4rem",
        right: "4rem",
        duration: 0.01,
      });
    }
  });

  return (
    <motion.section
      onMouseEnter={hoverHandler}
      onMouseLeave={hoverOutHandler}
      ref={containerRef}
      className={styles.wrapper}
    >
      <h2
        onClick={() => {
          goTo(props.href);
        }}
      >
        {props.text}
      </h2>
      <div
        onClick={() => {
          goTo(props.href);
        }}
        className={styles.arrow_container}
      >
        <div
          ref={arrowOne}
          style={{ top: "0", left: "0" }}
          className={styles.arrow}
        ></div>
        <div
          ref={arrowTwo}
          style={{ top: "4rem", right: "4rem" }}
          className={styles.arrow}
        ></div>
      </div>
    </motion.section>
  );
};
export default PreFooterLink;
