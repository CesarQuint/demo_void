"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, PropsWithChildren, ReactNode } from "react";
import s from "./CardImg.module.css";

gsap.registerPlugin(useGSAP);

interface Props extends PropsWithChildren {
    boxes?: [ReactNode?, ReactNode?, ReactNode?, ReactNode?];
}

export default function CardImg({ children, boxes }: Props) {
    const container = useRef<HTMLElement>(null);
    const boxesRef = useRef<(HTMLElement | null)[]>([]);
    const enterTl = useRef<gsap.core.Timeline | null>(null);
    const leaveTl = useRef<gsap.core.Timeline | null>(null);
    const positions = [
        [-100, -100],
        [100, -100],
        [-100, 100],
        [100, 100],
    ];

    const { contextSafe } = useGSAP({ scope: container });

    const onMouseEnter = contextSafe(() => {
        leaveTl.current?.kill();

        enterTl.current = gsap
            .timeline({
                defaults: {
                    duration: 0.5,
                    ease: "expo",
                },
            })
            .fromTo(
                boxesRef.current,
                {
                    opacity: 0,
                    xPercent: (i) => positions[i][0],
                    yPercent: (i) => positions[i][1],
                },
                {
                    opacity: 1,
                    xPercent: 0,
                    yPercent: 0,
                },
            )
            .fromTo(
                "img",
                {
                    filter: "saturate(100%) brightness(100%)",
                },
                {
                    scale: 0.85,
                    filter: "saturate(200%) brightness(70%)",
                },
                0,
            );
    });

    const onMouseLeave = contextSafe(() => {
        enterTl.current?.kill();
        leaveTl.current = gsap
            .timeline({
                defaults: {
                    duration: 0.8,
                    ease: "expo",
                },
            })
            .to(boxesRef.current, {
                opacity: 0,
                xPercent: (i) => positions[i][0],
                yPercent: (i) => positions[i][1],
            })
            .to(
                "img",
                {
                    scale: 1,
                    filter: "saturate(100%) brightness(100%)",
                    xPercent: 0,
                    yPercent: 0,
                },
                0,
            );
    });

    return (
        <picture
            ref={container}
            className={s.card}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
            <div className={s.boxes}>
                {boxes?.map((box, i) => (
                    <div
                        key={i}
                        ref={(r) => void (boxesRef.current[i] = r)}
                        className={box ? s.box : ""}
                    >
                        {box}
                    </div>
                ))}
            </div>
        </picture>
    );
}
