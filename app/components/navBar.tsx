// NavBar.tsx
"use client";
import React, { MouseEvent, useRef } from "react";
import Link from "next/link";
import { useNavigation } from "../utils/navigationContext";
import styles from "../css/navBar.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Splitting from "splitting";
import useWindow from "../utils/hooks/useWindow";

gsap.registerPlugin(useGSAP);

// prettier-ignore
const CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','];

const NavBar = () => {
  const container = useRef<HTMLElement>(null);
  const isMenuOpen = useRef(false);
  const linkRedirect = useRef("");
  const toggleTl = useRef<gsap.core.Timeline | null>(null);
  const { setNavigationEvent } = useNavigation();
  const router = useRouter();
  const windowInfo = useWindow();
  const { contextSafe } = useGSAP(
    () => {
      Splitting({
        target: container.current?.querySelectorAll(`.${styles.links} a`),
      });

      gsap.matchMedia().add("(max-width: 700px)", () => {
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
          .to(`.${styles.nav_container}`, { height: "90vh" }, 0)
          .to(`.${styles.line1}`, { rotate: "8.5deg" }, 0)
          .to(`.${styles.line2}`, { rotate: "-8.5deg" }, 0)
          .set(
            [`.${styles.links}`, `.${styles.langs}`],
            { height: "auto", pointerEvents: "all", opacity: 1 },
            0
          )
          .set(`.${styles.links} .char`, { opacity: 0 }, 0);

        gsap.utils
          .toArray<HTMLElement>(`.${styles.links} .char`)
          .forEach((el) => {
            toggleTl
              .current!.to(
                el,
                {
                  opacity: 1,
                  duration: 0.03,
                  delay: (_, el) =>
                    Number(gsap.getProperty(el, "--char-index")) * 0.05,
                },
                0.2
              )
              .to(
                el,
                {
                  textContent: () =>
                    CHARS[Math.floor(Math.random() * CHARS.length)],
                  repeat: 3,
                  repeatDelay: 0.05,
                  repeatRefresh: true,
                  duration: 0.03,
                },
                "<"
              )
              .to(
                el,
                { textContent: (_: any, el: HTMLElement) => el.dataset.char },
                ">"
              );
          });
      });
    },
    { scope: container }
  );

  const toggleMenu = contextSafe(() => {
    if (windowInfo.innerWidth > 0 && windowInfo.innerWidth < 700) {
      if (isMenuOpen.current) toggleTl.current?.reverse(0.2);
      else toggleTl.current?.play();

      isMenuOpen.current = !isMenuOpen.current;
    }
  });

  function goTo(e: MouseEvent, href: string) {
    e.preventDefault();
    if (windowInfo.innerWidth > 0 && windowInfo.innerWidth < 700)
      toggleTl.current!.reverse(0.2);
    setNavigationEvent({ state: true, href });
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
          <Link
            href="/frammer_main"
            onClick={(e) => {
              goTo(e, "/frammer_main");
            }}>
            Home
          </Link>
          <Link
            href="/playground"
            onClick={(e) => {
              goTo(e, "/playground");
            }}>
            Proyectos
          </Link>
          <Link href="/">El Estudio</Link>
          <Link href="/">Contacto</Link>
        </div>
        <div className={styles.linksMb}>
          <Link
            href="/playground"
            onClick={(e) => {
              goTo(e, "/playground");
            }}>
            Proyectos
          </Link>
          <Link href="#">El Estudio</Link>
          <Link
            href="#"
            className={styles.writeUs}>
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
