"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import styles from "../../css/projects.module.css";
import s from "../ScrollImg/ScrollImg.module.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import Splitting from "splitting";

import { Project } from "@/app/Strapi/interfaces/Entities/Project";

// prettier-ignore
const CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ',']

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  data: {
    strapiBaseUrl: string | undefined;
    projects: Project[]
  }
};

const ProjectImages = (props: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const imgContainer = useRef<HTMLElement[]>([]);

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

      gsap
        .matchMedia()
        .add("(min-width: 700px)", () => {
          gsap.set(line, { width: scrollContainer.current?.scrollWidth });

          const tl = gsap
            .timeline({
              defaults: {
                ease: "none",
              },
              scrollTrigger: {
                // markers: true,
                scrub: 0.1,
                pin: true,
                trigger: container.current,
                start: "top top",
                end: "bottom+=500% center",
              },
            })
            .to(boxes, { xPercent: -100 * boxes.length - 1 }, 0)
            .to(
              title,
              { x: () => -(title.offsetWidth - document.body.offsetWidth) },
              0
            )
            .to(line, { xPercent: -100 }, 0);

          imgContainer.current.forEach((el) => {
            gsap
              .timeline({
                defaults: {
                  ease: "none",
                },
                scrollTrigger: {
                  containerAnimation: tl,
                  trigger: el,
                  start: "top center",
                  end: "+=50% center",
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

          gsap.set("img", { opacity: 1 });
        })
        .add("(max-width: 700px)", () => {
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
    { scope: scrollContainer, dependencies: [container, scrollContainer] }
  );

  return (
    <motion.div ref={container}>
      <motion.section className={`${styles.project_wrapper}`}>
        <div className={styles.scrollView} ref={scrollContainer}>
          <h3 className={`${styles.title}`}>
            PROYECTOS
            <br />
            <span className={s.second}>DESTACADOS</span>
          </h3>
          <div className={styles.line}>
            <button className={styles.viewAll}>PROXIMAMENTE</button>
          </div>
          {props.data.projects.map((_: Project, i: number) => (
            <div
              className={styles.imgBox}
              key={i}
              style={{ "--column": i + 1 } as React.CSSProperties}
            >
              <figure
                ref={(el) => void (imgContainer.current[i] = el!)}
                className={s.figure}
              >
                <span className="word-animated">{_.attributes.EventDate}</span>
                <div className={s.wrapper}>
                  <Image
                    style={{ objectFit: "cover" }}
                    title={_.attributes.Title}
                    src={props.data.strapiBaseUrl + _.attributes.Cover.data.attributes.formats.medium.url}
                    fill
                    sizes="50%"
                    alt="example"
                  />
                </div>
                <figcaption className={s.caption}>
                  <div className={s.tag}>{_.attributes.Category.data.attributes.Name}</div>
                  <div className={`word-animated ${s.title}`}>{_.attributes.Title}</div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ProjectImages;
