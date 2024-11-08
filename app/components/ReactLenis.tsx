"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import React from "react";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
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
