/* eslint-disable jsx-a11y/alt-text */
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import s from './ScrollImg.module.css'
import Image from 'next/image'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface Props extends React.ComponentProps<typeof Image> {
  title?: string
  caption?: string
  isLeftSide?: boolean
}

export default function ScrollImg({ title, caption, isLeftSide, ...props }: Props) {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap
        .timeline({
          defaults: {
            ease: 'none',
          },
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom-=15%',
            end: '+=50%',
            scrub: true,
          },
        })
        .fromTo(
          `.${s.wrapper}`,
          {
            yPercent: -100,
            xPercent: isLeftSide ? 100 : -100,
          },
          {
            yPercent: 0,
            xPercent: 0,
          },
        )
        .fromTo(
          'img',
          {
            yPercent: 100,
            xPercent: isLeftSide ? -100 : 100,
          },
          {
            yPercent: 0,
            xPercent: 0,
          },
          0,
        )
        .fromTo(
          `.${s.caption}`,
          {
            yPercent: 200,
            xPercent: 50,
            opacity: 0,
          },
          {
            yPercent: 0,
            xPercent: 0,
            opacity: 1,
          },
          0,
        )
    },
    { scope: container, dependencies: [isLeftSide], revertOnUpdate: true },
  )

  return (
    <figure ref={container} className={s.figure}>
      <div className={s.wrapper}>
        <Image {...props} />
      </div>
      <figcaption className={s.caption}>
        <div className={s.title}>{title}</div>
        <div>{caption}</div>
      </figcaption>
    </figure>
  )
}
