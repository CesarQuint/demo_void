import React, { useRef } from "react";
import styles from "../css/tags.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { AboutUsTag } from "../constants/tags_text";
import useWindow from "../utils/hooks/useWindow";


gsap.registerPlugin(useGSAP, ScrollTrigger)

type Props = {
  contentArr: AboutUsTag[]
}

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
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tags = gsap.utils.toArray<HTMLElement>(`.${styles.tag}`)
      const space = gsap.getProperty(container.current, 'gap') as number

      function setMarginTop(el: HTMLElement, i: number) {
        const iSpace = space * (i + 1)
        const differenceHeight = tags[0].offsetHeight - el.offsetHeight

        gsap.set(el, { marginTop: differenceHeight + iSpace })
      }

      tags.slice(1).forEach((el, i, arr) => {
        const iSpace = i === 0 ? space : 0
        const start = tags[i].offsetTop + tags[i].clientHeight + iSpace
        const scrollStart = space * (arr.length - i)

        gsap.fromTo(
          el,
          { scale: 0.95 - i * 0.02 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container.current,
              start: `${start} bottom-=${scrollStart}`,
              end: `+=50 bottom-=${scrollStart}`,
              scrub: true,
            },
            onStart() {
              gsap.set(el, { marginTop: 'auto' })
            },
            onReverseComplete() {
              setMarginTop(el, i)
            },
          },
        )
      })

      gsap.set(tags, {
        bottom: (i) => space * (tags.length - i),
        zIndex: (i) => tags.length - i,
        position: 'sticky',
      })

      const ob = new IntersectionObserver(([ev]) => {
        if (!ev.isIntersecting) return

        if (ev.boundingClientRect.top >= 0) {
          tags.slice(1).forEach((el, i) => setMarginTop(el, i))
        }

        ob.disconnect()
      })

      ob.observe(container.current!)
      return () => ob.disconnect()
    },
    { scope: container },
  )

  return (
    <motion.div className={`${styles.main}`}>
      <div className={`${styles.tags_wrapper}`}>
        <section className={`${styles.tags_container}`} ref={container}>
          {props.contentArr.map((_, i) => (
            <TagsContent
              key={i}
              i={i}
              title={_.title}
              number={_.number}
              content={_.content}
            />
          ))}
        </section>
      </div>
    </motion.div>
  )
}

export default Tags
