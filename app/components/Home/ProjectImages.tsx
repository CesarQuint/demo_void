"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../css/projects.module.css";
import ScrollImg from "../ScrollImg/ScrollImg";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

const ProjectImages = (props: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const [title, line, ...boxes] = scrollContainer.current!
        .children as any as HTMLElement[];

      gsap
        .matchMedia()
        .add("(min-width: 700px)", () => {
          const tl = gsap
            .timeline({
              defaults: {
                ease: "none",
              },
              scrollTrigger: {
                pin: true,
                scrub: 0.1,
                trigger: container.current,
                start: "+10% top+=15%",
                end: "bottom top+=15%",
              },
            })
            .to(boxes, { xPercent: -100 * boxes.length - 1 }, 0)
            .to(
              title,
              { x: () => -(title.offsetWidth - document.body.offsetWidth) },
              0
            )
            .to(line, { xPercent: -100 }, 0);

          setTl(tl);
        })
        .add("(max-width: 700px)", () => {
          setTl(null);
        });
    },
    { scope: scrollContainer, dependencies: [container, scrollContainer] }
  );

  const images = [
    "https://tympanus.net/Development/ConnectedGrid/img/14.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/15.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/16.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/17.jpg",
    "https://tympanus.net/Development/ConnectedGrid/img/18.jpg",
  ];

  return (
    <motion.div ref={container}>
      <motion.section className={`${styles.project_wrapper}`}>
        <div
          className={styles.scrollView}
          ref={scrollContainer}>
          <h3 className={`${styles.title}`}>
            PROYECTOS
            <br />
            DESTACADOS
          </h3>
          <div className={styles.line}>
            <button className={styles.viewAll}>VER TODOS</button>
          </div>
          {images.map((src, i) => (
            <div
              className={styles.imgBox}
              key={i}
              style={{ "--column": i + 1 } as React.CSSProperties}>
              <ScrollImg
                date="2024-jun-07"
                title="Raíces lumínicas"
                caption="Instalación visual en el bosque"
                tag="EN VIVO"
                scrollTl={tl}
                isLeftSide={tl ? false : !(i % 2)}
                src={src}
                fill
                sizes="50%"
                alt="example"
              />
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ProjectImages;
