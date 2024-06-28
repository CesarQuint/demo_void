import React, { useRef } from "react";
import Image from "next/image";
import styles from "../css/tags.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import voidGif from "../../public/gifts/void_gif.gif";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

const Tags = (props: Props) => {

  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const GAP = 32
      const cardMargin = 50

      const btn = container.current!.querySelector(`.${styles.know_more}`)! as HTMLElement
      const firstCardHeight = container.current!.firstElementChild!.getBoundingClientRect().height
      const tags = gsap.utils.toArray(`.${styles.tag}`)

      function startAnimation() {
        gsap.set(tags, {
          bottom: (i, _, arr) => btn!.offsetHeight + GAP + cardMargin * (arr.length - i - 1),
          zIndex: (i, _, arr) => arr.length - i,
        })

        gsap
          .timeline({
            defaults: {
              ease: 'none',
            },
            scrollTrigger: {
              trigger: btn,
              start: 'bottom bottom-=5%',
              end: 'bottom bottom-=5%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(btn, { marginTop: firstCardHeight + GAP + cardMargin * (tags.length - 1) }, { marginTop: 0 })
          .fromTo(tags, { marginTop: (i) => cardMargin * i }, { marginTop: 0 })

        gsap
          .timeline({
            defaults: {
              ease: 'none',
            },
            scrollTrigger: {
              trigger: container.current,
              start: 'top center+=10%',
              end: `${firstCardHeight} center`,
              scrub: true,
            },
          })
          .fromTo(tags, { scale: (i) => 1 - i * 0.05 }, { scale: 1 }, 0)
      }

      const ob = new IntersectionObserver(
        ([ev]) => {
          if (ev.isIntersecting || ev.boundingClientRect.top < 0) {
            startAnimation()
            ob.disconnect()
          }
        },
        { root: null, rootMargin: '0px', threshold: 0 },
      )

      ob.observe(container.current!)
      return () => ob.disconnect()

    },
    { scope: container }
  );

  return (
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
            Somos un grupo de artistas digitales apasionados por la tecnología y
            la comunicación expertos en crear experiencias para solucionar los
            retos que enfrentan nuestros clientes y comunicar grandes ideas.
          </p>
        </section>
        <section
          className={`${styles.tags_container}`}
          ref={container}>
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className={`${styles.tag}`}>
                <h4 className={`${styles.tag_title}`}>Card {i + 1}</h4>
                <p>
                  Suspendisse dapibus ipsum erat, quis blandit mi condimentum
                  eget. Aenean sodales id nunc eu sodales. Pellentesque at urna
                  dapibus, volutpat nisi nec, suscipit libero. Morbi non
                  eleifend ante. Donec orci ipsum, dapibus at justo a, facilisis
                  commodo lectus. Vestibulum eget odio nulla. Integer ut lorem
                  iaculis,
                </p>
              </div>
            ))}
          <button className={`${styles.know_more}`}>Ver Todos</button>
        </section>
      </div>
    </motion.div>
  );
};

export default Tags;
