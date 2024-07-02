/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./ScrollImg.module.css";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props extends React.ComponentProps<typeof Image> {
  date: string
  title: string
  caption: string
  tag: string
  isLeftSide?: boolean
  scrollTl?: gsap.core.Timeline | null
}

export default function ScrollImg({ title, caption, isLeftSide, date, tag, scrollTl, ...props }: Props) {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const height = document?.documentElement.scrollHeight;
      const bottom =
        container.current!.offsetTop + container.current!.offsetHeight;
      const bottomPercentage = (bottom / height) * 100;

      gsap.set('img', { opacity: 1 })

      gsap
        .timeline({
          defaults: {
            ease: "none",
          },
          scrollTrigger: {
            containerAnimation: scrollTl!,
            trigger: container.current,
            start: `${scrollTl ? 'top center' : `top bottom${bottomPercentage >= 90 ? "+=25%" : "-=15%"}`}`,
            end: `${scrollTl ? '+=50% center' : '+=50%'}`,
            scrub: true,
          },
        })
        .fromTo(
          `.${s.wrapper}`,
          {
            yPercent: -100,
            xPercent: isLeftSide ? 100 : -100,
          },
          {
            yPercent: 0,
            xPercent: 0,
          }
        )
        .fromTo(
          "img",
          {
            yPercent: 100,
            xPercent: isLeftSide ? -100 : 100,
          },
          {
            yPercent: 0,
            xPercent: 0,
          },
          0
        )
        .fromTo(
          `.${s.caption}`,
          {
            yPercent: 200,
            xPercent: 50,
            opacity: 0,
          },
          {
            yPercent: 0,
            xPercent: 0,
            opacity: 1,
          },
          0,
        )
    },
    { scope: container, dependencies: [isLeftSide, scrollTl], revertOnUpdate: true },
  )

  return (
    <figure
      ref={container}
      className={s.figure}>
      <span>{date}</span>
      <div className={s.wrapper}>
        <Image {...props} />
      </div>
      <figcaption className={s.caption}>
        <div className={s.tag}>{tag}</div>
        <div className={s.title}>{title}</div>
        <div>{caption}</div>
      </figcaption>
    </figure>
  );
}
