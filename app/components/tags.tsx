import React, { useRef } from "react";
import styles from "../css/tags.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { AboutUsTag } from "../constants/tags_text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  contentArr: AboutUsTag[];
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
            <div
              key={i}
              className={`${styles.tag}`}>
              <section className={styles.left_content}>
                <h4>{_.number}</h4>
              </section>
              <article className={styles.right_content}>
                <section>
                  <p className={styles.right_numeral}>{_.number}</p>
                  <h5 className={styles.title}>{_.title}</h5>
                </section>
                <div className={styles.right_text_content}>
                  {_.content.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              </article>
            </div>
          ))}
          <button className={`${styles.know_more}`}>Ver Todos</button>
        </section>
      </div>
    </motion.div>
  );
};

export default Tags;
