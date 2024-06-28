"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../css/title.module.css";
gsap.registerPlugin(ScrollTrigger);
import Image from "next/image";
import logo from "../../public/void_Nb.svg";

type Props = {};

const Title = ({ text, words = 6 }: { text: string; words: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);
  const timelineRef2 = useRef<GSAPTimeline | null>(null);
  const midWords = Math.ceil(words / 2);
  const wordsArr = new Array(words + 1).fill(text);

  useEffect(() => {
    if (containerRef.current) {
      const spanWords = Array.from(
        containerRef.current.getElementsByClassName(styles.text_float)
      );

      const innerArr = spanWords;
      innerArr.pop();
      const half = midWords;
      const firstHalf = innerArr.slice(0, half);
      const secondHalf = innerArr.slice(half);

      interface docBuild {
        y: number;
        delay: number;
      }

      const generateDelayAndYPercent: docBuild[] = innerArr.map((_, index) => {
        let calc = 30 * index;
        let per = 1.0 - 0.03 * index;
        return {
          y: calc * per,
          delay: 0.1 + 0.1 * index,
        };
      });

      const negativeCopy = generateDelayAndYPercent.map((doc: docBuild) => {
        return { y: -doc.y, delay: doc.delay };
      });

      const targetXPositions = generateDelayAndYPercent
        .slice(0, midWords)
        .concat(negativeCopy.slice(0, midWords));

      const tl = gsap.timeline({
        defaults: {
          ease: "power1", // Use a smoother ease
        },
      });

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "center center",
          scrub: 0, // Adjust as needed
        },
        defaults: {
          ease: "power1", // Use a smoother ease
        },
      });

      secondHalf.reverse().forEach((span, index) => {
        tl.to(
          span,
          {
            yPercent: Number(targetXPositions[firstHalf.length + index].y),
          },
          0
        );
      });

      secondHalf.reverse().forEach((span, index) => {
        tl2.to(span, {
          yPercent: `-${Number(targetXPositions[firstHalf.length + index].y)}`,
        });
        // tl2.to(containerRef.current, {
        //   height: `+=${Number(targetXPositions[firstHalf.length + index].y)}`,
        // });
      });

      timelineRef.current = tl;
      timelineRef2.current = tl2;
    }

    return () => {
      timelineRef.current?.kill(); // Clean up the timeline on component unmount
      timelineRef2.current?.kill(); // Clean up the timeline on component unmount
    };
  }, []);

  return (
    <div className={`${styles.body}`}>
      <div
        ref={containerRef}
        className={`${styles.content}`}>
        <h1 className={`${styles.text_rep}`}>
          {wordsArr.map((word: string, _i: number) => (
            <span
              id={`${_i}`}
              className={`${styles.text_float}`}
              key={_i}>
              <Image
                className={`${styles.image_logo}`}
                src={logo}
                alt="logo"
              />
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Title;
