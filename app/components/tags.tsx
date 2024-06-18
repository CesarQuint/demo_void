import React, { useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../css/tags.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import voidGif from "../../public/gifts/void_gif.gif";
gsap.registerPlugin(ScrollTrigger);

type Props = {};

const Tags = (props: Props) => {
  const firstSlide = useRef(null);
  const secondSlide = useRef(null);
  const thirdSlide = useRef(null);
  const containerSlideRef = useRef(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    if (
      containerSlideRef.current !== null &&
      firstSlide.current &&
      secondSlide.current
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerSlideRef.current,
          start: "top center",
          end: "center center",
          scrub: 1, // Adjust as needed
        },
        defaults: {
          ease: "sine.inOut", // Use a smoother ease
          duration: 2,
        },
      });

      tl.to(secondSlide.current, {
        duration: 2,
        transform: "scale(1) translate(0px,10px) ",
      });

      tl.to(thirdSlide.current, {
        duration: 2,
        transform: "scale(1) translate(0px,10px) ",
        delay: 0.2,
      });

      tl.to(thirdSlide.current, {
        duration: 2,
        transform: "scale(1) translate(0px,10px) ",
        delay: 0.2,
      });

      tl.to(
        containerSlideRef.current,
        {
          duration: 2,
          height: "150vh",
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
        <div className={`${styles.tags_wrapper}`}>
          <section className={`${styles.text_introduction}`}>
            <h3 className={`${styles.title_process}`}>NUESTRO PROCESO</h3>
            <Image
              className={`${styles.gif_info}`}
              src={voidGif}
              alt="Void_Gidf"
            />
            <p>
              Somos un grupo de artistas digitales apasionados por la tecnología
              y la comunicación expertos en crear experiencias para solucionar
              los retos que enfrentan nuestros clientes y comunicar grandes
              ideas.
            </p>
          </section>
          <section
            ref={containerSlideRef}
            className={`${styles.tags_container}`}>
            <motion.div
              ref={firstSlide}
              style={{ zIndex: "5" }}
              className={`${styles.tag}`}>
              <h4 className={`${styles.tag_title}`}>Card 1</h4>
              <p>
                Suspendisse dapibus ipsum erat, quis blandit mi condimentum
                eget. Aenean sodales id nunc eu sodales. Pellentesque at urna
                dapibus, volutpat nisi nec, suscipit libero. Morbi non eleifend
                ante. Donec orci ipsum, dapibus at justo a, facilisis commodo
                lectus. Vestibulum eget odio nulla. Integer ut lorem iaculis,
              </p>
            </motion.div>
            <motion.div
              ref={secondSlide}
              className={`${styles.tag}`}
              style={{
                transform: "translate(0vh,-200px) scale(0.9)",
                zIndex: 3,
              }}>
              <h4 className={`${styles.tag_title}`}>Card 2</h4>
              <p>
                Suspendisse dapibus ipsum erat, quis blandit mi condimentum
                eget. Aenean sodales id nunc eu sodales. Pellentesque at urna
                dapibus, volutpat nisi nec, suscipit libero. Morbi non eleifend
                ante. Donec orci ipsum, dapibus at justo a, facilisis commodo
                lectus. Vestibulum eget odio nulla. Integer ut lorem iaculis,
              </p>
            </motion.div>
            <motion.div
              ref={thirdSlide}
              className={`${styles.tag}`}
              style={{
                transform: "translate(0vh,-400px) scale(0.7)",
                zIndex: "1",
              }}>
              <h4 className={`${styles.tag_title}`}>Card 3</h4>
              <p>
                Suspendisse dapibus ipsum erat, quis blandit mi condimentum
                eget. Aenean sodales id nunc eu sodales. Pellentesque at urna
                dapibus, volutpat nisi nec, suscipit libero. Morbi non eleifend
                ante. Donec orci ipsum, dapibus at justo a, facilisis commodo
                lectus. Vestibulum eget odio nulla. Integer ut lorem iaculis,
              </p>
            </motion.div>
            <motion.button className={`${styles.know_more}`}>
              Ver Todos
            </motion.button>
          </section>
        </div>
      </motion.div>
    </>
  );
};

export default Tags;
