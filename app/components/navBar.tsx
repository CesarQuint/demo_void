'use client'
import React, { MouseEvent, useRef, useState } from 'react'
import Link from 'next/link'
import { useNavigation } from '../utils/navigationContext'
import styles from '../css/navBar.module.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import TypedLink from './TypedLink/TypedLink'
import useWindow from "../utils/hooks/useWindow";

gsap.registerPlugin(useGSAP)

const NavBar = () => {
  const container = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const linkRedirect = useRef('')
  const toggleTl = useRef<gsap.core.Timeline | null>(null)
  const { setNavigationEvent } = useNavigation()
  const router = useRouter()
  const windowInfo = useWindow();

  console.log(windowInfo);

  const { contextSafe } = useGSAP(
    () => {
      gsap.matchMedia().add('(max-width: 700px)', () => {
        toggleTl.current = gsap
          .timeline({
            paused: true,
            defaults: {
              duration: 0.3,
              ease: "expo",
            },
            onReverseComplete() {
              if (linkRedirect.current)
                setNavigationEvent({ state: true, href: linkRedirect.current });
            },
          })
          .to(`.${styles.nav_container}`, { height: '90vh' }, 0)
          .to(`.${styles.line1}`, { rotate: '8.5deg' }, 0)
          .to(`.${styles.line2}`, { rotate: '-8.5deg' }, 0)
          .set([`.${styles.links}`, `.${styles.langs}`], { height: 'auto', pointerEvents: 'all', opacity: 1 }, 0)
          .set(`.${styles.links} .char`, { opacity: 0 }, 0)
      })
    },
    { scope: container }
  );

  const toggleMenu = contextSafe(() => {
    if (windowInfo.innerWidth > 0 && windowInfo.innerWidth < 700) {
      setIsMenuOpen(!isMenuOpen)

      if (isMenuOpen) toggleTl.current?.reverse(0.2)
      else toggleTl.current?.play()
    }
  })

  function goTo(e: MouseEvent, href: string) {
    e.preventDefault()

    if (windowInfo.innerWidth > 0 && windowInfo.innerWidth < 700) {
      toggleTl.current!.reverse(0.2);
    }

    setNavigationEvent({ state: true, href })
  }


  return (
    <header ref={container}>
      <section className={styles.nav_container}>
        <div className={styles.top}>
          <Image
            className={styles.image_logo}
            onClick={(e) => {
              goTo(e, "/frammer_main");
            }}
            src="/void.svg"
            alt="void"
            width={125}
            height={40}
          />

          <button
            className={styles.nav_btn}
            onClick={toggleMenu}>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
          </button>
        </div>

        <div className={styles.links}>
          {isMenuOpen && (
            <>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/frammer_main"
                onClick={(e) => {
                  goTo(e, '/frammer_main')
                }}
              >
                Home
              </TypedLink>
              <TypedLink
                viewAnimate={true}
                hoverAnimate={false}
                href="/playground"
                onClick={(e) => {
                  goTo(e, '/playground')
                }}
              >
                Proyectos
              </TypedLink>
              <TypedLink viewAnimate={true} hoverAnimate={false} href="/">
                El Estudio
              </TypedLink>
              <TypedLink viewAnimate={true} hoverAnimate={false} href="/">
                Contacto
              </TypedLink>
            </>
          )}
        </div>
        <div className={styles.linksMb}>
          <TypedLink href="#">Proyectos</TypedLink>
          <TypedLink href="#">El Estudio</TypedLink>
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
  );
};

export default NavBar;
