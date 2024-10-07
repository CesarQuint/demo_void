"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "../css/gsapExample.module.css";

type Props = {};

const GsapInteraction = (props: Props) => {
    const container = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: container });

    const onClickGood = contextSafe(() => {
        gsap.to(`.${styles.good}`, { rotation: "+=180" });
    });

    return (
        <div className={styles.main}>
            <div ref={container} className={styles.container}>
                <button onClick={onClickGood} className={`${styles.good}`}>
                    Hellow
                </button>
            </div>
        </div>
    );
};

export default GsapInteraction;
