"use client";

import { useRef } from "react";
import styles from "../css/gsapExample.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function GsapExample() {
    const container = useRef<HTMLDivElement>(null);
    const circle = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // use selectors...
            gsap.to(`.${styles.box}`, { rotation: "+=360", duration: 3 });

            // or refs...
            gsap.to(circle.current, { rotation: "-=360", duration: 3 });
        },
        { scope: container },
    ); // <-- scope for selector text (optional)

    return (
        <div className={styles.main}>
            <div ref={container} className={`${styles.container}`}>
                <div className={`${styles.box} ${styles.gradientBlue}`}>
                    selector
                </div>
                <div
                    className={`${styles.circle} ${styles.gradientGreen}`}
                    ref={circle}
                >
                    Ref
                </div>
            </div>
            <div className={`${styles.box} ${styles.gradientBlue}`}>
                selector
            </div>
        </div>
    );
}
