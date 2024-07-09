import React, { useRef } from "react";
import styles from "../css/tags.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { AboutUsTag } from "../constants/tags_text";
import useWindow from "../utils/hooks/useWindow";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  contentArr: AboutUsTag[];
};

type TagsContentProps = {
  i: number;
  number: string;
  title: string;
  content: string[];
};

const TagsContent = (props: TagsContentProps) => {
  const windowStatus = useWindow();

  return (
    <div
      key={props.i}
      className={`${styles.tag}`}>
      {windowStatus.innerHeight < 768 ? (
        <>
          <section>
            <p className={styles.right_numeral}>{props.number}</p>
            <h5 className={styles.title}>{props.title}</h5>
          </section>
          <section className={styles.left_content}>
            <h4>{props.number}</h4>
          </section>
          <div className={styles.right_text_content}>
            {props.content.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </>
      ) : (
        <>
          <section className={styles.left_content}>
            <h4>{props.number}</h4>
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
      )}
    </div>
  );
};

const Tags = (props: Props) => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const GAP = 32;
      const cardMargin = 50;

      const btn = container.current!.querySelector(
        `.${styles.know_more}`
      )! as HTMLElement;
      const firstCardHeight =
        container.current!.firstElementChild!.getBoundingClientRect().height;
      const tags = gsap.utils.toArray(`.${styles.tag}`);

      function startAnimation() {
        gsap.set(tags, {
          bottom: (i, _, arr) =>
            btn!.offsetHeight + GAP + cardMargin * (arr.length - i - 1),
          zIndex: (i, _, arr) => arr.length - i,
        });

        gsap
          .timeline({
            defaults: {
              ease: "none",
            },
            scrollTrigger: {
              trigger: btn,
              start: "bottom bottom-=5%",
              end: "bottom bottom-=5%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            btn,
            {
              marginTop: firstCardHeight + GAP + cardMargin * (tags.length - 1),
            },
            { marginTop: 0 }
          )
          .fromTo(tags, { marginTop: (i) => cardMargin * i }, { marginTop: 0 });

        gsap
          .timeline({
            defaults: {
              ease: "none",
            },
            scrollTrigger: {
              trigger: container.current,
              start: "top center+=10%",
              end: `${firstCardHeight} center`,
              scrub: true,
            },
          })
          .fromTo(tags, { scale: (i) => 1 - i * 0.05 }, { scale: 1 }, 0);
      }

      const ob = new IntersectionObserver(
        ([ev]) => {
          if (ev.isIntersecting || ev.boundingClientRect.top < 0) {
            startAnimation();
            ob.disconnect();
          }
        },
        { root: null, rootMargin: "0px", threshold: 0 }
      );

      ob.observe(container.current!);
      return () => ob.disconnect();
    },
    { scope: container }
  );

  return (
    <motion.div className={`${styles.main}`}>
      <div className={`${styles.tags_wrapper}`}>
        <section
          className={`${styles.tags_container}`}
          ref={container}>
          {props.contentArr.map((_, i) => (
            <TagsContent
              key={i}
              i={i}
              title={_.title}
              number={_.number}
              content={_.content}
            />
          ))}
          <button className={`${styles.know_more}`}>Ver Todos</button>
        </section>
      </div>
    </motion.div>
  );
};

export default Tags;
