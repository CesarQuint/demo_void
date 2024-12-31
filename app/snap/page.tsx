"use client";

import React, { useEffect, useRef, useState } from "react";

import s from "./snap.module.css";

import gsap from "gsap";
import { ScrollTrigger, Draggable } from "gsap/all";
import { useLenis } from "@studio-freight/react-lenis";

gsap.registerPlugin(ScrollTrigger, Draggable);

const Page = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [panels, setPanels] = useState<HTMLElement[]>([]);
    const tl = useRef<gsap.core.Timeline | null>(null);

    const lenis = useLenis();
    const [currIndx, setCurrIndx] = useState<number>(0);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const [scrollableFromDoc, setScrollableFromDoc] = useState<number>(0);
    const [clientVisibleHeight, setClientVisibleHeight] = useState<number>(0);

    // Populate panels after the DOM is rendered
    useEffect(() => {
        const panelElements = gsap.utils.toArray(
            `.${s.panel}`
        ) as HTMLElement[];
        setPanels(panelElements);
    }, []);

    useEffect(() => {
        if (
            lenis &&
            panels.length > 0 &&
            scrollableFromDoc !== 0 &&
            clientVisibleHeight !== 0
        ) {
            const availableScroll =
                (scrollableFromDoc - clientVisibleHeight) / (panels.length - 1);

            const handleScroll = (e: any) => {
                if (isScrolling) return;

                const scrollPosition = window.scrollY;
                const maxScroll = scrollableFromDoc - clientVisibleHeight;

                // Prevent scroll handling when at the extremes
                if (scrollPosition <= 0 || scrollPosition >= maxScroll) return;

                const nextIndx =
                    e.direction === 1
                        ? Math.min(currIndx + 1, panels.length - 1)
                        : Math.max(currIndx - 1, 0);

                if (nextIndx !== currIndx) {
                    let scrollPx = availableScroll * nextIndx;

                    if (nextIndx == panels.length - 1) {
                        scrollPx = scrollPx - 1;
                    }

                    setIsScrolling(true);
                    lenis.stop();
                    lenis.scrollTo(scrollPx, {
                        force: true,
                        lock: true,
                        onComplete: () => {
                            setCurrIndx(nextIndx);
                            setTimeout(() => {
                                setIsScrolling(false);
                                lenis.start();
                            }, 300);
                        },
                    });
                }
            };

            lenis.on("scroll", (e: any) => {
                console.log(window.scrollY);

                handleScroll(e);
            });

            return () => {
                lenis.off("scroll", handleScroll);
            };
        }
    }, [
        lenis,
        panels,
        currIndx,
        isScrolling,
        scrollableFromDoc,
        clientVisibleHeight,
    ]);

    useEffect(() => {
        if (isMobile) return;

        if (!containerRef) return;

        tl.current = gsap
            .timeline({
                defaults: {
                    ease: "none",
                },
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: true,
                    once: true,
                    preventOverlaps: true,
                    end: `${scrollContainerRef.current!.scrollWidth} bottom`,
                    onEnter: () => {
                        setScrollableFromDoc(
                            document.documentElement.scrollHeight
                        );
                        setClientVisibleHeight(
                            document.documentElement.clientHeight
                        );
                    },
                },
            })
            .to(
                scrollContainerRef.current,
                {
                    x: containerRef.current!.clientWidth,
                    xPercent: -100,
                },
                0
            );

        return () => {
            if (tl.current) tl.current.kill();
        };
    }, [isMobile]);

    return (
        <section ref={containerRef} className={`${s.main}`}>
            <div className={`${s.container}`} ref={scrollContainerRef}>
                <div className={`${s.panel} ${s.one}`}>Part 1</div>
                <div className={`${s.panel} ${s.two}`}>Part 2</div>
                <div className={`${s.panel} ${s.three}`}>Part 3</div>
                <div className={`${s.panel} ${s.four}`}>Part 4</div>
                <div className={`${s.panel} ${s.five}`}>Part 5</div>
                <div className={`${s.panel} ${s.six}`}>Part 6</div>
            </div>
        </section>
    );
};

export default Page;
