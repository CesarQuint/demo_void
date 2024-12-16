"use client";
import React, { useRef, useState } from "react";
import s from "./snap.module.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, Draggable } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

const page = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            const panels = gsap.utils.toArray(`.${s.panel}`);
            gsap.to(panels, {
                ease: "none",
                scrollTrigger: {
                    trigger: ".container",
                    snap: {
                        snapTo: 1 / (panels.length - 1),
                        duration: 0.2,
                        delay: 0.01,
                    },
                    // base vertical scrolling on how wide the container is so it feels more natural.
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef}>
            <section className={`${s.panel} ${s.one}`}>Part 1</section>
            <section className={`${s.panel}  ${s.two}`}>Part 2</section>
            <section className={`${s.panel}  ${s.three}`}>Part 3</section>
            <section className={`${s.panel}  ${s.four}`}>Part 4</section>
            <section className={`${s.panel}  ${s.five}`}>part 5</section>
            <section className={`${s.panel}  ${s.six}`}>Part 6</section>
        </div>
    );
};

export default page;
