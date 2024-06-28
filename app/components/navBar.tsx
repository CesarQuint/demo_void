// NavBar.tsx
'use client'
import React, { MouseEvent, useRef } from 'react'
import Link from 'next/link'
import { useNavigation } from '../utils/navigationContext'
import styles from '../css/navBar.module.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Splitting from 'splitting'

gsap.registerPlugin(useGSAP)

// prettier-ignore
const CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','];

const NavBar = () => {
  const container = useRef<HTMLElement>(null)
  const isMenuOpen = useRef(false)
  const linkRedirect = useRef('')
  const toggleTl = useRef<gsap.core.Timeline | null>(null)
  const { setNavigationEvent } = useNavigation()
  const router = useRouter()

  const { contextSafe } = useGSAP(
    () => {
      Splitting({ target: container.current?.querySelectorAll(`.${styles.links} a`) })

      gsap.matchMedia().add('(max-width: 700px)', () => {
        toggleTl.current = gsap
          .timeline({
            paused: true,
            defaults: {
              duration: 0.3,
              ease: 'expo',
            },
            onReverseComplete() {
              if (linkRedirect.current) setNavigationEvent({ state: true, href: linkRedirect.current })
              isMenuOpen.current = false
            },
            onComplete() {
              isMenuOpen.current = true
            },
          })
          .to(`.${styles.nav_container}`, { height: '90vh' }, 0)
          .to(`.${styles.line1}`, { rotate: '8.5deg' }, 0)
          .to(`.${styles.line2}`, { rotate: '-8.5deg' }, 0)
          .to([`.${styles.links}`, `.${styles.langs}`], { height: 'auto' }, 0)
          .to([`.${styles.links}`, `.${styles.langs}`], { opacity: 1, duration: 0.5 }, 0.3)
          .to(
            [`.${styles.links} .char`],
            {
              duration: 0.03,
              innerHTML: () => CHARS[Math.floor(Math.random() * CHARS.length)],
              repeat: 3,
              repeatRefresh: true,
              opacity: 1,
              repeatDelay: 0.05,
              onComplete: () => {
                gsap.set([`.${styles.links} .char`], {
                  innerHTML: (_: any, el: HTMLElement) => el.dataset.char,
                  delay: 0.03,
                })
              },
            },
            0.3,
          )
          .set([`.${styles.links}`, `.${styles.langs}`], { pointerEvents: 'all' }, 0.3)
      })
    },
    { scope: container },
  )

  const toggleMenu = contextSafe(() => {
    if (isMenuOpen.current) toggleTl.current?.reverse(0.2)
    else toggleTl.current?.play()
  })

  function goTo(e: MouseEvent) {
    e.preventDefault()
    linkRedirect.current = (e.target as HTMLElement).getAttribute('href') || ''
    toggleTl.current?.reverse(0.2)
  }

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
          <Link href="/frammer_main" onClick={goTo}>
            Home
          </Link>
          <Link href="/playground" onClick={goTo}>
            Proyectos
          </Link>
          <Link href="/">El Estudio</Link>
          <Link href="/">Contacto</Link>
        </div>
        <div className={styles.linksMb}>
          <Link href="#">Proyectos</Link>
          <Link href="#">El Estudio</Link>
          <Link href="#" className={styles.writeUs}>
            <span className={styles.writeUsTxt}>Escribenos</span>
            <span className={styles.writeUsIcon}>+</span>
          </Link>
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
