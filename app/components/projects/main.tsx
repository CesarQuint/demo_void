"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../css/Projects/main.module.css";
import s from "../ScrollImg/ScrollImg.module.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { stand_out_projects } from "@/app/constants/stand_out_projects";
import Image from "next/image";
import Splitting from "splitting";

// prettier-ignore
const CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ',']

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

const Main = (props: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const imgContainer = useRef<HTMLElement[]>([]);
  const [imgLoaded, setImageLoaded] = useState(false);

  useGSAP(
    () => {
      const [title, line, ...boxes] = scrollContainer.current!
        .children as any as HTMLElement[];

      const captions = gsap.utils.toArray<HTMLEmbedElement>(".word-animated");

      const splitting = Splitting({
        target: captions,
        by: "chars",
      });

      gsap.set(captions, { opacity: 0 });

      gsap.matchMedia().add("(max-width: 1700px)", () => {
        gsap.set("img", { opacity: 1 });

        imgContainer.current.forEach((el) => {
          gsap
            .timeline({
              defaults: {
                ease: "none",
              },
              scrollTrigger: {
                trigger: el,
                start: "top bottom-=20%",
                end: "+=50% bottom-=20%",
                // markers: true,
                scrub: true,
                onLeave() {
                  splitting.forEach((data) => {
                    if (!el!.contains(data.el as Element)) return;

                    gsap.set(data.el as Element, { opacity: 1 });

                    data.chars?.forEach((char, i) => {
                      gsap.killTweensOf(char);
                      gsap.set(char, { textContent: char.dataset.char });

                      let firstRepeat = true;

                      gsap
                        .timeline({
                          defaults: { duration: 0.03, repeatDelay: 0.03 },
                        })
                        .fromTo(
                          char,
                          { opacity: 0 },
                          { opacity: 1, delay: (i + 1) * 0.04 }
                        )
                        .to(
                          char,
                          {
                            repeat: 4,
                            repeatRefresh: true,
                            textContent: () =>
                              CHARS[Math.floor(Math.random() * CHARS.length)],
                            onStart() {
                              gsap.set(char, { "--opa": 1 });
                            },
                            onRepeat() {
                              if (firstRepeat) gsap.set(char, { "--opa": 0 });
                              firstRepeat = false;
                            },
                          },
                          "<"
                        )
                        .set(char, { textContent: char.dataset.char });
                    });
                  });
                },
                onEnterBack() {
                  splitting.forEach((data) => {
                    if (!el!.contains(data.el as Element)) return;

                    data.chars!.toReversed().forEach((char, i) => {
                      gsap.killTweensOf(char);
                      let firstRepeat = true;

                      gsap
                        .timeline({
                          defaults: { duration: 0.03, repeatDelay: 0.03 },
                        })
                        .to(char, {
                          repeat: 4,
                          repeatRefresh: true,
                          textContent: () =>
                            CHARS[Math.floor(Math.random() * CHARS.length)],
                          onStart() {
                            gsap.set(char, { "--opa": 1 });
                          },
                          onRepeat() {
                            if (firstRepeat) gsap.set(char, { "--opa": 0 });
                            firstRepeat = false;
                          },
                        })
                        .fromTo(
                          char,
                          { opacity: 1 },
                          { opacity: 0, delay: (i + 1) * 0.04 },
                          "<"
                        );
                    });
                  });
                },
              },
            })
            .fromTo(
              el?.querySelector(`.${s.wrapper}`)!,
              {
                yPercent: -100,
                xPercent: (i) => (i % 2 ? 100 : -100),
              },
              {
                yPercent: 0,
                xPercent: 0,
              }
            )
            .fromTo(
              el?.querySelector("img")!,
              {
                yPercent: 100,
                xPercent: (i) => (i % 2 ? -100 : 100),
              },
              {
                yPercent: 0,
                xPercent: 0,
              },
              0
            );
        });
      });
    },
    {
      scope: scrollContainer,
      dependencies: [container, scrollContainer, imgLoaded],
    }
  );

  return (
    <motion.div>
      <motion.section className={styles.nav_container}>
        <motion.nav className={styles.selector}>
          <motion.div className={`${styles.all} ${styles.tab}`}>
            TODO
          </motion.div>
          <motion.div className={styles.tab}>EN VIVO</motion.div>
          <motion.div className={styles.tab}>XR</motion.div>
          <motion.div className={styles.tab}>EXPERIENCIA</motion.div>
        </motion.nav>
      </motion.section>
      <motion.div ref={container}>
        <motion.section className={`${styles.project_wrapper}`}>
          <div className={styles.scrollView} ref={scrollContainer}>
            {stand_out_projects.map((_, i) => (
              <div
                className={styles.imgBox}
                key={i}
                style={{ "--column": i + 1 } as React.CSSProperties}
              >
                <figure
                  ref={(el) => void (imgContainer.current[i] = el!)}
                  className={s.figure}
                >
                  <span className="word-animated">{_.date}</span>
                  <div className={s.wrapper}>
                    <Image
                      onLoad={() => {
                        setImageLoaded(true);
                      }}
                      style={{ objectFit: "cover" }}
                      title={_.title}
                      src={_.image}
                      fill
                      sizes="50%"
                      alt="example"
                    />
                  </div>
                  <figcaption className={s.caption}>
                    <div className={s.tag}>{_.tag}</div>
                    <div className={`word-animated ${s.title}`}>{_.title}</div>
                    <div className="word-animated">{_.description}</div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default Main;
