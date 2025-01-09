"use client";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const lenis = useLenis();

    useEffect(() => {
        const updateGsap = () => {
            ScrollTrigger.update();
        };

        lenis?.on("scroll", updateGsap);

        return () => {
            lenis?.off("scroll", updateGsap);
        };
    }, [lenis]);

    return (
        <ReactLenis
            root
            options={{
                wheelMultiplier: 0.5,
                easing: function easeOutCirc(x: number): number {
                    return Math.sqrt(1 - Math.pow(x - 1, 2));
                },
            }}
        >
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;
