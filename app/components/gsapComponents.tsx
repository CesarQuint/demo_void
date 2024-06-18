// src/ScrollingText.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../css/title.module.css";
import Title from "./title";
import VideoHover from "./videoHover";

gsap.registerPlugin(ScrollTrigger);

const GsapComponent = ({
  text,
  words = 6,
}: {
  text: string;
  words: number;
}) => {
  //* Const
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<React.JSX.Element>();

  useEffect(() => {
    // if (containerRef.current && textRef.current) {
    //   const ctx = gsap.context(() => {
    //     gsap.to(textRef.current, {
    //       scrollTrigger: {
    //         trigger: `.${styles.test}`,
    //         start: "top center",
    //         end: "bottom center",
    //         toggleActions: "play play resume reset", // Play the animation on enter, do nothing on leave
    //         markers: true, // Optional: for debugging, shows start/end markers in the viewport
    //       },
    //       rotation: "+=360",
    //     });
    //   }, containerRef.current);
    //   return () => ctx.revert(); // Cleanup GSAP context on component unmount
    // }
  }, []);

  return (
    <div ref={containerRef}>
      <div className={`${styles.body}`}>{content}</div>

      <p
        ref={textRef}
        className={`${styles.text} ${styles.test}`}>
        Suspendisse dapibus ipsum erat, quis blandit mi condimentum eget. Aenean
        sodales id nunc eu sodales. Pellentesque at urna dapibus, volutpat nisi
        nec, suscipit libero. Morbi non eleifend ante. Donec orci ipsum, dapibus
        at justo a, facilisis commodo lectus. Vestibulum eget odio nulla.
        Integer ut lorem iaculis, ullamcorper quam in, semper urna. Sed enim
        augue, hendrerit eu elit nec, iaculis faucibus urna. Nam lectus sem,
        pellentesque eget arcu et, vestibulum efficitur ante. Donec accumsan
        gravida risus, non accumsan tellus accumsan at. Quisque id dolor mattis,
        efficitur massa sit amet, sodales lacus. Ut dapibus quam gravida,
        laoreet ex nec, tincidunt orci. Nam rutrum velit ante, nec consequat
        erat finibus vitae. Nulla pretium malesuada dolor ac pretium.
      </p>

      <Title
        text="VOIDXR"
        words={16}
      />

      <p
        ref={textRef}
        className={`${styles.text} ${styles.test}`}>
        Suspendisse dapibus ipsum erat, quis blandit mi condimentum eget. Aenean
        sodales id nunc eu sodales. Pellentesque at urna dapibus, volutpat nisi
        nec, suscipit libero. Morbi non eleifend ante. Donec orci ipsum, dapibus
        at justo a, facilisis commodo lectus. Vestibulum eget odio nulla.
        Integer ut lorem iaculis, ullamcorper quam in, semper urna. Sed enim
        augue, hendrerit eu elit nec, iaculis faucibus urna. Nam lectus sem,
        pellentesque eget arcu et, vestibulum efficitur ante. Donec accumsan
        gravida risus, non accumsan tellus accumsan at. Quisque id dolor mattis,
        efficitur massa sit amet, sodales lacus. Ut dapibus quam gravida,
        laoreet ex nec, tincidunt orci. Nam rutrum velit ante, nec consequat
        erat finibus vitae. Nulla pretium malesuada dolor ac pretium.
      </p>

      <p className={`${styles.text}`}>
        Suspendisse dapibus ipsum erat, quis blandit mi condimentum eget. Aenean
        sodales id nunc eu sodales. Pellentesque at urna dapibus, volutpat nisi
        nec, suscipit libero. Morbi non eleifend ante. Donec orci ipsum, dapibus
        at justo a, facilisis commodo lectus. Vestibulum eget odio nulla.
        Integer ut lorem iaculis, ullamcorper quam in, semper urna. Sed enim
        augue, hendrerit eu elit nec, iaculis faucibus urna. Nam lectus sem,
        pellentesque eget arcu et, vestibulum efficitur ante. Donec accumsan
        gravida risus, non accumsan tellus accumsan at. Quisque id dolor mattis,
        efficitur massa sit amet, sodales lacus. Ut dapibus quam gravida,
        laoreet ex nec, tincidunt orci. Nam rutrum velit ante, nec consequat
        erat finibus vitae. Nulla pretium malesuada dolor ac pretium.
      </p>

      <VideoHover />
    </div>
  );
};

export default GsapComponent;
