"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../css/title.module.css";

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<GSAPTimeline | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            const squares = Array.from(
                containerRef.current.getElementsByClassName(styles.square),
            );
            const targetXPositions = squares.map(
                (_, index) => (index + 1) * 10,
            ); // Adjust positions based on index

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: true, // Adjust as needed
                },
            });

            squares.forEach((square, index) => {
                tl.to(
                    square,
                    {
                        x: targetXPositions[index],
                        rotation: 360,
                    },
                    0,
                ); // The '0' ensures all animations start at the same time
            });

            timelineRef.current = tl;
        }

        return () => {
            timelineRef.current?.kill(); // Clean up the timeline on component unmount
        };
    }, []); // Empty dependency array ensures effect runs once

    return (
        <div ref={containerRef} className={`${styles.board}`}>
            <div className={`${styles.square} ${styles._1}`}>a</div>
            <div className={`${styles.square} ${styles._2}`}>b</div>
            {/* Add more elements here */}
            <div className={`${styles.square} ${styles._3}`}>c</div>
            <div className={`${styles.square} ${styles._4}`}>d</div>
            <div className={`${styles.square} ${styles._5}`}>e</div>
            <div className={`${styles.square} ${styles._6}`}>f</div>
            <div className={`${styles.square} ${styles._7}`}>g</div>
            <div className={`${styles.square} ${styles._8}`}>h</div>
            <div className={`${styles.square} ${styles._9}`}>i</div>
            <div className={`${styles.square} ${styles._10}`}>j</div>
        </div>
    );
};

export default Timeline;
