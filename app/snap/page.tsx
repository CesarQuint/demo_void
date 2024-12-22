"use client";
import React, { useEffect, useRef, useState } from "react";
import s from "./snap.module.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, Draggable } from "gsap/all";
import { useLenis } from "@studio-freight/react-lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

const Page = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lenis = useLenis();
    const panels: HTMLElement[] = gsap.utils.toArray(
        `.${s.panel}`
    ) as HTMLElement[];
    const [currIndx, setCurrIndx] = useState<number>(0);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);

    useEffect(() => {
        if (panels.length > 0 && lenis) {
            const handleScroll = (e: any) => {
                if (isScrolling) return; // Prevent new scroll while animating

                const nextIndx =
                    e.direction === 1
                        ? Math.min(currIndx + 1, panels.length - 1) // Scroll down
                        : Math.max(currIndx - 1, 0); // Scroll up

                if (nextIndx !== currIndx) {
                    setIsScrolling(true);
                    lenis.stop();
                    lenis.scrollTo(panels[nextIndx], {
                        force: true,
                        lock: true,

                        onComplete: () => {
                            setCurrIndx(nextIndx);
                            setTimeout(() => {
                                setIsScrolling(false);
                                lenis.start();
                            }, 300); // Delay to account for inertia
                        },
                    });
                }
            };

            lenis?.on("scroll", handleScroll);

            return () => {
                lenis?.off("scroll", handleScroll); // Cleanup
            };
        }
    }, [lenis, panels, currIndx, isScrolling]);

    return (
        <div>
            <div className={`${s.container}`} ref={containerRef}>
                <section className={`${s.panel} ${s.one}`}>Part 1</section>
                <section className={`${s.panel} ${s.two}`}>Part 2</section>
                <section className={`${s.panel} ${s.three}`}>Part 3</section>
                <section className={`${s.panel} ${s.four}`}>Part 4</section>
                <section className={`${s.panel} ${s.five}`}>Part 5</section>
                <section className={`${s.panel} ${s.six}`}>Part 6</section>
            </div>
        </div>
    );
};

export default Page;
