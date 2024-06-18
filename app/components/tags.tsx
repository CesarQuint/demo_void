import React, { useRef, useEffect } from "react";
import styles from "../css/tags.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

type Props = {};

const Tags = (props: Props) => {
  const firstSlide = useRef(null);
  const secondSlide = useRef(null);
  const thirdSlide = useRef(null);
  const containerSlideRef = useRef(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    if (firstSlide.current && secondSlide.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerSlideRef.current,
          start: "top center",
          end: "center center",
          scrub: 1, // Adjust as needed
          markers: true, // Optional: for debugging, shows start/end markers in the viewport
        },
        defaults: {
          ease: "sine.inOut", // Use a smoother ease
          duration: 2,
        },
      });

      tl.to(
        secondSlide.current,
        {
          duration: 2,
          transform: "scale(1) translate(0px,10px) ",
        },
        0
      );

      tl.to(
        thirdSlide.current,
        {
          duration: 2,
          transform: "scale(1) translate(0px,10px) ",
        },
        0
      );

      tl.to(
        containerSlideRef.current,
        {
          duration: 2,
          height: "130vh",
        },
        0
      );

      timelineRef.current = tl;
    }

    return () => {
      timelineRef.current?.kill(); // Clean up the timeline on component unmount
    };
  }, []);

  return (
    <>
      <motion.div className={`${styles.main}`}>
        <div>
          <h3>Tags Components</h3>
          <section
            ref={containerSlideRef}
            className={`${styles.tags_container}`}>
            <motion.div
              ref={firstSlide}
              style={{ zIndex: "5" }}
              className={`${styles.tag}`}>
              <h4>Card 1</h4>
              <p>
                Suspendisse dapibus ipsum erat, quis blandit mi condimentum
                eget. Aenean sodales id nunc eu sodales. Pellentesque at urna
                dapibus, volutpat nisi nec, suscipit libero. Morbi non eleifend
                ante. Donec orci ipsum, dapibus at justo a, facilisis commodo
                lectus. Vestibulum eget odio nulla. Integer ut lorem iaculis,
                ullamcorper quam in, semper urna. Sed enim augue, hendrerit eu
                elit nec, iaculis faucibus urna. Nam lectus sem, pellentesque
                eget arcu et, vestibulum efficitur ante. Donec accumsan gravida
                risus, non accumsan tellus accumsan at. Quisque id dolor mattis.
              </p>
            </motion.div>
            <motion.div
              ref={secondSlide}
              className={`${styles.tag}`}
              style={{
                transform: "translate(0vh,-25vh) scale(0.9)",
                zIndex: 3,
              }}>
              <h4>Card 2</h4>
              <p>
                Suspendisse dapibus ipsum erat, quis blandit mi condimentum
                eget. Aenean sodales id nunc eu sodales. Pellentesque at urna
                dapibus, volutpat nisi nec, suscipit libero. Morbi non eleifend
                ante. Donec orci ipsum, dapibus at justo a, facilisis commodo
                lectus. Vestibulum eget odio nulla. Integer ut lorem iaculis,
                ullamcorper quam in, semper urna. Sed enim augue, hendrerit eu
                elit nec, iaculis faucibus urna. Nam lectus sem, pellentesque
                eget arcu et, vestibulum efficitur ante. Donec accumsan gravida
                risus, non accumsan tellus accumsan at. Quisque id dolor mattis.
              </p>
            </motion.div>
            <motion.div
              ref={thirdSlide}
              className={`${styles.tag}`}
              style={{
                transform: "translate(0vh,-52vh) scale(0.7)",
                zIndex: "1",
              }}>
              <h4>Card 3</h4>
              <p>
                Suspendisse dapibus ipsum erat, quis blandit mi condimentum
                eget. Aenean sodales id nunc eu sodales. Pellentesque at urna
                dapibus, volutpat nisi nec, suscipit libero. Morbi non eleifend
                ante. Donec orci ipsum, dapibus at justo a, facilisis commodo
                lectus. Vestibulum eget odio nulla. Integer ut lorem iaculis,
                ullamcorper quam in, semper urna. Sed enim augue, hendrerit eu
                elit nec, iaculis faucibus urna. Nam lectus sem, pellentesque
                eget arcu et, vestibulum efficitur ante. Donec accumsan gravida
                risus, non accumsan tellus accumsan at. Quisque id dolor mattis.
              </p>
            </motion.div>
            <motion.button className={`${styles.know_more}`}>
              Saber más
            </motion.button>
          </section>
        </div>
      </motion.div>
    </>
  );
};

export default Tags;
