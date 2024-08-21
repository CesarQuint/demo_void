"use client";
import Image from "next/image";

import Splitting from "splitting";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@/app/utils/navigationContext";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import s from "../ScrollImg/ScrollImg.module.css";
import styles from "../../css/Projects/main.module.css";

import TypedLink from "../TypedLink/TypedLink";
import { Project } from "@/app/Strapi/interfaces/Entities/Project";
import { Category } from "@/app/Strapi/interfaces/Entities/Category";
import {
  ProjectElementImage,
  ProjectElementCaption,
} from "../Home/ProjectImages";

import {
  getProjectsByCategory,
  getProjectsData,
} from "../../Strapi/RestAPI/ProjectsProvider";

const CHARS = "!#$%&*+,-:;<=>@^_abcdefghijklmnopqrstuvwxyz";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TAB_ICONS = {
  ACTIVE:
    "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/icons/check_circle_filled.svg",
  INACTIVE:
    "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/icons/check_circle.svg",
};

const CategoryStateIcon = ({ active }: { active: boolean }) => (
  <Image
    className={styles.icon}
    width={1000}
    height={1000}
    alt="Icon"
    src={active ? TAB_ICONS.ACTIVE : TAB_ICONS.INACTIVE}
  />
);

const CategoryTab = ({
  active,
  data,
}: {
  active: boolean;
  data: { category: Category };
}) => (
  <div className={styles.tab}>
    <CategoryStateIcon active={active} />
    {data.category.attributes.Name.toUpperCase()}
  </div>
);

const CategoryTabs = ({
  activeIndex,
  setActive,
  data,
}: {
  activeIndex: number;
  setActive: (idx: number) => void;
  data: { categories: Category[] };
}) => (
  <>
    <TypedLink
      href="/proyectos"
      onClick={(e) => (e.preventDefault(), setActive(-1))}
    >
      <div className={[styles.all, styles.tab].join(" ")}>
        <CategoryStateIcon active={activeIndex === -1} />
        {"todo".toUpperCase()}
      </div>
    </TypedLink>

    {data.categories.map((category, idx) => (
      <TypedLink
        key={idx}
        href={"/proyectos/" + category.attributes.slug}
        onClick={(e) => (e.preventDefault(), setActive(idx))}
      >
        <CategoryTab active={idx === activeIndex} data={{ category }} />
      </TypedLink>
    ))}
  </>
);

export default function ProjectsSectionView(props: {
  data: { categories: Category[] };
  loadState: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const imgContainer = useRef<HTMLElement[]>([]);
  const [imgLoaded, setImageLoaded] = useState(false);
  const [activeIconIndex, setActiveIconIndex] = useState(-1);
  const [projects, setProjects] = useState<Project[]>([]);
  const { setNavigationEvent } = useNavigation();

  useEffect(() => {
    Promise.resolve(
      activeIconIndex === -1
        ? getProjectsData()
        : getProjectsByCategory({
            slug: props.data.categories[activeIconIndex].attributes.slug,
          })
    ).then((res) => (setProjects(res.data), props.loadState()));
  }, [activeIconIndex]);

  useGSAP(
    () => {
      const captions = gsap.utils.toArray<HTMLEmbedElement>(".word-animated");

      const splitting = Splitting({
        target: captions,
        by: "chars",
      });

      gsap.set(captions, { opacity: 0 });

      gsap.matchMedia().add("(max-width: 2700px)", () => {
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

  function goTo(href: string) {
    setNavigationEvent({ state: true, href });
  }

  return (
    <motion.div>
      <motion.section className={styles.nav_container}>
        <motion.nav className={styles.selector}>
          <CategoryTabs
            activeIndex={activeIconIndex}
            setActive={setActiveIconIndex}
            data={{ categories: props.data.categories }}
          />
        </motion.nav>
      </motion.section>
      <motion.div ref={container}>
        <p className={styles.about}>
          Partiendo del arte y con la tecnología como base, creamos experiencias
          que detonan sensaciones y emocionan a las personas.
        </p>
        <motion.section className={`${styles.project_wrapper}`}>
          <div className={styles.scrollView} ref={scrollContainer}>
            {projects.map((project, i) => (
              <div
                onClick={(e) => {
                  goTo(`/projects/${project.attributes.slug}`);
                }}
                className={styles.imgBox}
                key={i}
                style={{ "--column": i + 1 } as React.CSSProperties}
              >
                <figure
                  ref={(el) => void (imgContainer.current[i] = el!)}
                  className={s.figure}
                >
                  <span className="word-animated">
                    {project.attributes.EventDate}
                  </span>
                  <ProjectElementImage
                    data={{
                      title: project.attributes.Title,
                      slug: project.attributes.slug,
                      url: project.attributes.Cover.data.attributes.formats
                        .large.url,
                    }}
                    loadHook={() => setImageLoaded(true)}
                  />
                  <ProjectElementCaption
                    data={{
                      title: project.attributes.Title,
                      category:
                        project.attributes.Category.data.attributes.Name,
                      description: project.attributes.Subtitle,
                    }}
                  />
                </figure>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}
