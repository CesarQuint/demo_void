"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../css/title.module.css";
gsap.registerPlugin(ScrollTrigger);

type Props = {};

const Title = ({ text, words = 6 }: { text: string; words: number }) => {
  //* Const
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);
  const timelineRef2 = useRef<GSAPTimeline | null>(null);
  const [content, setContent] = useState<React.JSX.Element>();
  const midWords = Math.floor(words / 2);
  const wordsArr = new Array(midWords).fill(text);

  //* Generate component content
  const createTitle = (text: string, words: number) => {
    let wordsUpSpans = wordsArr.map((word: string, _i: number) => (
      <span
        className={`${styles.text_float}`}
        key={_i}>
        {word}
      </span>
    ));

    const wordsDowsSpans = wordsArr.map((word: string, _i: number) => (
      <span
        className={`${styles.text_float}`}
        key={_i + wordsArr.length}>
        {word}
      </span>
    ));

    wordsUpSpans = wordsUpSpans.concat(wordsDowsSpans);

    return (
      <div className={`${styles.content}`}>
        <h1
          ref={containerRef}
          className={`${styles.text_rep}`}>
          {wordsUpSpans}
        </h1>
      </div>
    );
  };

  useEffect(() => {
    setContent(createTitle(text, words));

    if (containerRef.current) {
      const spanWords = Array.from(
        containerRef.current.getElementsByClassName(styles.text_float)
      );

      spanWords.pop();

      const half = Math.ceil(spanWords.length / 2);
      const firstHalf = spanWords.slice(0, half);
      const secondHalf = spanWords.slice(half);

      const posCopy = spanWords.map((_, index) => {
        return (index + 1) * 8 - (index * spanWords.length) / 2;
      }); // Adjust positions based on index

      interface docBuild {
        y: number;
        delay: number;
      }

      const generateDelayAndYPercent: docBuild[] = spanWords.map((_, index) => {
        return {
          y: 10 + index * (10 - index),
          delay: 0.1 + 0.1 * index,
        };
      });

      const negativeCopy = generateDelayAndYPercent.map((doc: docBuild) => {
        return { y: -doc.y, delay: doc.delay };
      });

      const targetXPositions = generateDelayAndYPercent
        .slice(0, Math.floor(midWords / 2))
        .concat(negativeCopy.slice(0, Math.floor(midWords / 2)));

      //   console.log(targetXPositions);

      //   const targetXPositions = spanWords.map((_, index) => (index + 1) * 10);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "center center",
          scrub: 1, // Adjust as needed
        },
        defaults: {
          ease: "sine.inOut", // Use a smoother ease
          duration: 2,
        },
      });

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "bottom center",
          scrub: 1, // Adjust as needed
        },
        defaults: {
          ease: "sine.inOut", // Use a smoother ease
          duration: 2,
        },
      });

      secondHalf.reverse().forEach((span, index) => {
        tl.to(
          span,
          {
            y: Number(targetXPositions[firstHalf.length + index].y),
            delay: Number(targetXPositions[firstHalf.length + index].delay),
          },
          0
        );
      });

      firstHalf.reverse().forEach((span, index) => {
        tl2.to(
          span,
          {
            yPercent: Number(targetXPositions[index].y),
            delay: Number(targetXPositions[index].delay),
          },
          0
        );
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
              {word}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Title;
