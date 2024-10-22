"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import React from "react";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.015, // Lower value makes it more responsive
                duration: 1.2, // Slightly lower duration for quicker easing
                syncTouch: true,
                syncTouchLerp: 0.02, // Increase to smoothen touch gestures
                touchInertiaMultiplier: 15, // Slightly reduced inertia
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
