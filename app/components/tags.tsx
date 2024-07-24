"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../css/tags.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { AboutUsTag } from "../constants/tags_text";
import useWindow from "../utils/hooks/useWindow";
import Image from "next/image";
import { useIntersectionObserver } from "../utils/hooks/useIntersectionObserver";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  contentArr: AboutUsTag[];
};

type TagsContentProps = {
  i: number;
  img: string;
  number: string;
  title: string;
  content: string[];
  setImageLoaded: Dispatch<SetStateAction<boolean>>;
};

const TagsContent = (props: TagsContentProps) => {
  const windowStatus = useWindow();

  if (windowStatus && windowStatus.innerWidth < 768) {
    return (
      <>
        <section>
          <p className={styles.right_numeral}>{props.number}</p>
          <h5 className={styles.title}>{props.title}</h5>
        </section>
        <section className={styles.image_wrapper}>
          <Image
            onLoad={() => {
              props.setImageLoaded(true);
            }}
            width={1000}
            height={1000}
            className={styles.image}
            src={props.img}
            alt="image_card"
          />
        </section>
        <div className={styles.right_text_content}>
          {props.content.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </>
    );
  }

  if (windowStatus && windowStatus.innerWidth > 768) {
    return (
      <>
        <section className={styles.left_content}>
          <Image
            onLoad={() => {
              props.setImageLoaded(true);
            }}
            width={1000}
            height={1000}
            className={styles.image}
            src={props.img}
            alt="image_card"
          />
        </section>
        <article className={styles.right_content}>
          <section>
            <p className={styles.right_numeral}>{props.number}</p>
            <h5 className={styles.title}>{props.title}</h5>
          </section>
          <div className={styles.right_text_content}>
            {props.content.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </article>
      </>
    );
  }
};

const Tags = (props: Props) => {
  const windowStatus = useWindow();
  const [imgLoad, setImageLoad] = useState(false);

  const { isIntersecting, ref: container } = useIntersectionObserver();

  useGSAP(
    () => {
      if (!imgLoad || !container.current) return;

      const tags = gsap.utils.toArray<HTMLDivElement>(`.${styles.tag}`);
      const heights = tags.map((el) => el.offsetHeight);
      const space = 32;

      gsap.set(container.current, {
        height: heights.reduce((s, h) => s + h + space, 0),
      });

      gsap.set(tags, {
        top: (i, el) => heights[0] - el.offsetHeight + space * i,
        zIndex: (i) => tags.length - i,
      });

      gsap.set(tags.slice(1), { scale: (i) => 0.95 - i * 0.02 });

      const positions = tags.map(() => ({ y: 0 }));
      const setters = tags.map((el) => gsap.quickSetter(el, "y", "px"));
      const loaded = tags.map(() => false);

      function startScroll(i: number) {
        if (loaded[i] || i === tags.length - 1) return;
        loaded[i] = true;

        const scrollDuration = Math.max(...heights);
        const scrollStart = heights[0] / 2 + scrollDuration * i;

        const y = {
          start: positions[i].y,
          end: positions[i].y + heights[i + 1],
        };

        gsap
          .timeline({
            defaults: {
              ease: "none",
            },
            scrollTrigger: {
              trigger: container.current,
              start: `${scrollStart} center`,
              end: `+=${scrollDuration} center`,
              // markers: true,
              scrub: true,
              onLeave() {
                startScroll(i + 1);
              },
            },
          })
          .to(tags[i + 1], { scale: 1 }, 0)
          .fromTo(
            positions.slice(i + 1),
            { y: y.start },
            {
              y: y.end,
              onUpdate() {
                positions
                  .slice(i + 1)
                  .forEach(({ y }, j) => setters[i + j + 1](y));
              },
            },
            0,
          );
      }

      startScroll(0);
    },
    { scope: container, dependencies: [container, imgLoad] },
  );

  return (
    <motion.div className={`${styles.main}`}>
      <motion.div className={`${styles.tags_wrapper}`}>
        <motion.section className={`${styles.tags_container}`} ref={container}>
          {props.contentArr.map((_, i) => (
            <motion.div key={i} className={`${styles.tag}`}>
              <TagsContent
                i={i}
                img={_.img}
                title={_.title}
                number={_.number}
                content={_.content}
                setImageLoaded={setImageLoad}
              />
            </motion.div>
          ))}
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default Tags;
