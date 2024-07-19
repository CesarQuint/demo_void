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
        <section>
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
  const container = useRef<HTMLDivElement>(null);
  const windowStatus = useWindow();
  const [imgLoad, setImageLoad] = useState(false);

  useGSAP(
    () => {
      if (imgLoad && container.current !== null) {
        const tags = gsap.utils.toArray<HTMLDivElement>(`.${styles.tag}`);
        const space = gsap.getProperty(container.current, "gap") as number;

        const margins = tags.slice(1).map((el, i) => {
          const iSpace = space * (i + 1);
          const differenceHeight = tags[0].offsetHeight - el.offsetHeight;

          return differenceHeight + iSpace;
        });

        tags.slice(1).forEach((el, i, arr) => {
          const start = tags[i].offsetTop + tags[i].clientHeight;
          const end = tags[i + 1].offsetTop + tags[i + 1].offsetHeight;
          const scrollStart = space * arr.length;

          gsap.fromTo(
            el,
            { scale: 0.95 - i * 0.02 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: container.current,
                start: `${start} bottom-=${scrollStart}`,
                end: `${end} bottom-=${scrollStart}`,
                // markers: true,
                scrub: true,
                onUpdate(e) {
                  const iSpace = space * (i + 1);
                  const differenceHeight =
                    tags[0].offsetHeight - el.offsetHeight + iSpace;
                  const y = (e.end - e.start) * e.progress;

                  gsap.set(el, {
                    marginTop: y > differenceHeight ? "auto" : margins[i],
                  });
                },
              },
            }
          );
        });

        gsap.set(container.current, {
          maxHeight: container.current!.scrollHeight,
        });

        gsap.set(tags, {
          bottom: (i) => space * (tags.length - i),
          zIndex: (i) => tags.length - i,
          position: "sticky",
        });

        tags
          .slice(1)
          .forEach((el, i) => gsap.set(el, { marginTop: margins[i] }));
      }
    },
    { scope: container, dependencies: [container, imgLoad] }
  );

  return (
    <motion.div className={`${styles.main}`}>
      <motion.div className={`${styles.tags_wrapper}`}>
        <motion.section
          className={`${styles.tags_container}`}
          ref={container}>
          {props.contentArr.map((_, i) => (
            <motion.div
              key={i}
              className={`${styles.tag}`}>
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
