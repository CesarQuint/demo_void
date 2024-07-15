import Link from "next/link";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import Splitting from "splitting";
import { gsap } from "gsap";
import s from "./TypedLink.module.css";

gsap.registerPlugin(useGSAP);

const CHARS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "-",
  "_",
  "+",
  "=",
  ";",
  ":",
  "<",
  ">",
  ",",
];

interface Props extends React.ComponentProps<typeof Link> {
  hoverAnimate?: boolean;
  viewAnimate?: boolean;
}

export default function TypedLink({
  hoverAnimate,
  viewAnimate = true,
  ...props
}: Props) {
  const container = useRef<HTMLAnchorElement>(null);
  const splitter = useRef<Splitting.Result | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (typeof window !== "undefined") {
        splitter.current = Splitting({
          target: container.current!,
          by: "chars",
        })[0]!;
      }
    },
    { scope: container }
  );

  const animateLink = contextSafe(() => {
    if (typeof window === "undefined") return;

    const chars = splitter.current?.chars;
    if (!chars) return;

    chars.forEach((char, i) => {
      gsap.killTweensOf(char);
      gsap.set(char, { textContent: char.dataset.char });

      let firstRepeat = true;

      gsap
        .timeline({
          defaults: { duration: 0.03, repeatDelay: 0.03 },
        })
        .fromTo(char, { opacity: 0 }, { opacity: 1, delay: (i + 1) * 0.04 })
        .to(
          char,
          {
            repeat: 4,
            repeatRefresh: true,
            textContent: () => CHARS[Math.floor(Math.random() * CHARS.length)],
            onStart() {
              gsap.set(char, { "--opa": 1 });
            },
            onRepeat() {
              if (firstRepeat) gsap.set(char, { "--opa": 0 });
              firstRepeat = false;
            },
          },
          "<"
        )
        .set(char, { textContent: char.dataset.char });
    });
  });

  useEffect(() => {
    if (!viewAnimate || typeof window === "undefined") return;

    const ob = new IntersectionObserver(() => {
      animateLink();
    });

    ob.observe(container.current!);

    return () => ob.disconnect();
  }, [viewAnimate, animateLink]);

  return (
    <Link
      {...props}
      className={s.link}
      ref={container}
      onMouseEnter={animateLink}
    />
  );
}
