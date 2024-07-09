import React, { useRef } from 'react'
import styles from '../css/tags.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { AboutUsTag } from '../constants/tags_text'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type Props = {
  contentArr: AboutUsTag[]
}

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
        const scrollStart = space * arr.length

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
              markers: true,
              onUpdate(e) {
                if (e.direction > 0) {
                  gsap.set(el, { marginTop: 'auto' })
                } else {
                  setMarginTop(el, i)
                }
              },
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
            <div key={i} className={`${styles.tag}`}>
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
        </section>
      </div>
    </motion.div>
  )
}

export default Tags
