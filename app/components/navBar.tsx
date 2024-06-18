// NavBar.tsx
'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useNavigation } from '../utils/navigationContext'
import styles from '../css/navBar.module.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const NavBar = () => {
  const container = useRef<HTMLElement>(null)
  const foo = useRef(false);
  const toggleTl = useRef<any>(null)
  const { setNavigationEvent } = useNavigation()
  const router = useRouter()

  const { contextSafe } = useGSAP(
    () => {
      toggleTl.current = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: 0.3,
            ease: 'expo',
          },
        })
        .to(`.${styles.nav_container}`, { height: '90vh' }, 0)
        .to(`.${styles.line1}`, { rotate: '8.5deg' }, 0)
        .to(`.${styles.line2}`, { rotate: '-8.5deg' }, 0)
        .to([`.${styles.links}`, `.${styles.langs}`], { height: 'auto' }, 0)
        .to([`.${styles.links}`, `.${styles.langs}`], { opacity: 1, duration: 0.5 }, 0.3)
        .set([`.${styles.links}`, `.${styles.langs}`], { pointerEvents: 'all' }, 0.3)
    },
    { scope: container },
  )

  const toggleMenu = contextSafe(() => {
    if (foo.current) {
      toggleTl.current.reverse(0.2);
    } else {
      toggleTl.current.play();
    }

    foo.current = !foo.current
  })

  return (
    <header ref={container}>
      <section className={styles.nav_container}>
        <div className={styles.top}>
          <Image src="/void.svg" alt="void" width={125} height={40} />

          <button className={styles.nav_btn} onClick={toggleMenu}>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
          </button>
        </div>

        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/">Proyectos</Link>
          <Link href="/">El Estudio</Link>
          <Link href="/">Contacto</Link>
        </div>

        <div className={styles.langs}>
          <button>Español</button>
          <button>English</button>
        </div>
      </section>
    </header>
  )
}

export default NavBar
