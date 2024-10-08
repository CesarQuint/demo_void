"use client";

import { useId, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import useMouse from "../../utils/hooks/useMouse";
import s from "./Cursor.module.css";

export default function Cursor() {
    const container = useRef<HTMLDivElement>(null);
    const mouse = useMouse();

    //#region position

    const verticalLineRef = useRef<SVGSVGElement>(null);
    const horizontalLineRef = useRef<SVGSVGElement>(null);

    useGSAP(
        () => {
            const pos = { x: 0, y: 0 };
            const amt = 0.15;
            let renderId = 0;
            const xTo = gsap.quickSetter(verticalLineRef.current, "x", "px");
            const yTo = gsap.quickSetter(horizontalLineRef.current, "y", "px");

            function render() {
                pos.x = gsap.utils.interpolate(pos.x, mouse.x, amt);
                pos.y = gsap.utils.interpolate(pos.y, mouse.y, amt);
                xTo(pos.x);
                yTo(pos.y);
                renderId = window.requestAnimationFrame(render);
            }

            function firstRender(ev: MouseEvent) {
                pos.x = ev.x;
                pos.y = ev.y;

                gsap.to([horizontalLineRef.current, verticalLineRef.current], {
                    duration: 0.9,
                    ease: "Power3.easeOut",
                    opacity: 1,
                });

                renderId = window.requestAnimationFrame(render);
            }

            window.addEventListener("mousemove", firstRender, { once: true });
            return () => {
                window.removeEventListener("mousemove", firstRender);
                window.cancelAnimationFrame(renderId);
            };
        },
        { scope: container },
    );

    //#endregion

    //#region wave

    const verticalFilterId = useId();
    const horizontalFilterId = useId();
    const verticalFeTurbulenceRef = useRef<SVGFETurbulenceElement>(null);
    const horizontalFeTurbulenceRef = useRef<SVGFETurbulenceElement>(null);

    useGSAP(
        () => {
            const state = { frequency: 0 };
            const tl = gsap
                .timeline({
                    paused: true,
                    onUpdate: () => {
                        horizontalFeTurbulenceRef.current!.setAttribute(
                            "baseFrequency",
                            `${state.frequency}`,
                        );
                        verticalFeTurbulenceRef.current!.setAttribute(
                            "baseFrequency",
                            `${state.frequency}`,
                        );
                    },
                })
                .to(state, {
                    duration: 0.5,
                    ease: "power1",
                    startAt: { frequency: 1 },
                    frequency: 0,
                });

            function enter() {
                tl.restart();
            }
            function leave() {
                tl.progress(1).kill();
            }

            function handleHover(ev: MouseEvent) {
                const target = ev.target as HTMLElement;
                if (target.matches("a")) enter();
            }
            function handleBlur(ev: MouseEvent) {
                const target = ev.target as HTMLElement;
                if (target.matches("a")) leave();
            }

            window.addEventListener("mouseover", handleHover);
            window.addEventListener("mouseout", handleBlur);
            return () => {
                window.removeEventListener("mouseover", handleHover);
                window.removeEventListener("mouseout", handleBlur);
            };
        },
        {
            scope: container,
            dependencies: [horizontalFilterId, verticalFilterId],
        },
    );

    //#endregion

    return (
        <div ref={container} className={s.cursor}>
            <svg
                ref={horizontalLineRef}
                className={`${s.line} ${s.horizontal}`}
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                filter={`url(#${horizontalFilterId})`}
            >
                <defs>
                    <filter
                        id={horizontalFilterId}
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                        filterUnits="objectBoundingBox"
                    >
                        <feTurbulence
                            ref={horizontalFeTurbulenceRef}
                            type="fractalNoise"
                            baseFrequency="0"
                            numOctaves="1"
                            result="warp"
                        />
                        <feOffset dx="-30" result="warpOffset" />
                        <feDisplacementMap
                            xChannelSelector="R"
                            yChannelSelector="G"
                            scale="30"
                            in="SourceGraphic"
                            in2="warpOffset"
                        />
                    </filter>
                </defs>

                <line
                    className={s.stroke}
                    x1="0"
                    y1="10"
                    x2="200"
                    y2="10"
                    shapeRendering="crispEdges"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            <svg
                ref={verticalLineRef}
                className={`${s.line} ${s.vertical}`}
                viewBox="0 0 20 200"
                preserveAspectRatio="none"
                filter={`url(#${verticalFilterId})`}
            >
                <defs>
                    <filter
                        id={verticalFilterId}
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                        filterUnits="objectBoundingBox"
                    >
                        <feTurbulence
                            ref={verticalFeTurbulenceRef}
                            type="fractalNoise"
                            baseFrequency="0"
                            numOctaves="1"
                            result="warp"
                        />
                        <feOffset dy="-30" result="warpOffset" />
                        <feDisplacementMap
                            xChannelSelector="R"
                            yChannelSelector="G"
                            scale="30"
                            in="SourceGraphic"
                            in2="warpOffset"
                        />
                    </filter>
                </defs>

                <line
                    className={s.stroke}
                    x1="10"
                    y1="0"
                    x2="10"
                    y2="200"
                    shapeRendering="crispEdges"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
}
