"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Splitting from "splitting";

import styles from "../../css/projects.module.css";
import s from "../ScrollImg/ScrollImg.module.css";

import { Project } from "@/app/Strapi/interfaces/Entities/Project";

const CHARS = "!#$%&*+,-:;<=>@^_abcdefghijklmnopqrstuvwxyz";

const StaticContent = {
  BACKGRUND_TITLE: "Proyectos destacados",
  HYPERLINK_BUTTON: "Ver todos",
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BackgroundTitle = (props: { title: string }) =>
(
  <h3 className={styles.title}>
    {props.title.split(" ")[0]?.toUpperCase()}
    <br />
    <span className={s.second}>
      {props.title.split(" ")[1]?.toUpperCase()}
    </span>
  </h3>
);

const ViewAllProjectsButton = (props: { buttonText: string }) =>
(
  <div className={styles.line}>
    <button className={styles.viewAll}>{props.buttonText.toUpperCase()}</button>
  </div>
);

const ProjectElementContent = (props: { data: { project: Project, strapiBaseUrl: string } }) =>
(<>
  <span className="word-animated">{props.data.project.attributes.EventDate.toUpperCase()}</span>
  <ProjectElementImage data={{
    title: props.data.project.attributes.Title,
    url: props.data.strapiBaseUrl + props.data.project.attributes.Cover.data.attributes.formats.large.url
  }} />
  <ProjectElementCaption data={{
    title: props.data.project.attributes.Title,
    category: props.data.project.attributes.Category.data.attributes.Name,
    description: props.data.project.attributes.Subtitle,
  }} />
</>);

const ProjectElementImage = (props: { data: { title: string, url: string } }) =>
(
  <div className={s.wrapper}>
    <Image
      style={{ objectFit: "cover" }}
      title={props.data.title}
      src={props.data.url}
      fill
      sizes="50%"
      alt={props.data.title}
    />
  </div>
);

const ProjectElementCaption = (props: { data: { title: string, category: string, description: string } }) =>
(
  <figcaption className={s.caption}>
    <div className={s.tag}>{props.data.category.toUpperCase()}</div>
    <div className={`word-animated ${s.title}`}>{props.data.title}</div>
    <div className={`word-animated ${s.description}`}>{props.data.description.toUpperCase()}</div>
  </figcaption>
);

const ProjectElement = (props: { refHook: (el: HTMLElement) => void, idx: number, data: { project: Project, strapiBaseUrl: string } }) =>
(
  <div
    className={styles.imgBox}
    style={{ "--column": props.idx + 1 } as React.CSSProperties}
  >
    <figure className={s.figure} ref={props.refHook}>
      <ProjectElementContent data={{ project: props.data.project, strapiBaseUrl: props.data.strapiBaseUrl }} />
    </figure>
  </div>
);

const ProjectsHorizontalCarousel = (props: { imageContainers: HTMLElement[], data: { projects: Project[], strapiBaseUrl: string } }) =>
(<>{
  props.data.projects.map((project: Project, idx: number) =>
  (
    <ProjectElement
      key={idx}
      idx={idx}
      data={{
        project,
        strapiBaseUrl: props.data.strapiBaseUrl
      }}
      refHook={(element: HTMLElement) => void (props.imageContainers[idx] = element)}
    />
  ))
}</>);

const ProjectImages = (props: { data: { strapiBaseUrl: string | undefined; projects: Project[] } }) => {
  const container = useRef<HTMLDivElement>(null);
  const imgContainers = useRef<HTMLElement[]>([]);
  const scrollContainer = useRef<HTMLDivElement>(null);

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

          imgContainers.current.forEach((el) => {
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

          imgContainers.current.forEach((el) => {
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
          <BackgroundTitle title={StaticContent.BACKGRUND_TITLE} />
          <ViewAllProjectsButton buttonText={StaticContent.HYPERLINK_BUTTON} />
          <ProjectsHorizontalCarousel imageContainers={imgContainers.current} data={{ projects: props.data.projects, strapiBaseUrl: props.data.strapiBaseUrl ?? "" }} />
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ProjectImages;
