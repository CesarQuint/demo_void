"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import styles from "../../css/hero.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { DisplacementGeometry } from "../../hero_demo/ColumnDisplacementMaterial";
import { CustomCursor } from "../cursor";
import { useIntersectionObserver } from "../../utils/hooks/useIntersectionObserver";

gsap.registerPlugin(useGSAP);

type Props = {};

const HeroContainer = (props: Props) => {
    const { isIntersecting, ref: containerHeroRef } = useIntersectionObserver();
    const arrowRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP(
        () => {
            if (containerHeroRef.current !== null)
                gsap.to(containerHeroRef.current, { opacity: 1 });

            gsap.to(arrowRef.current, {
                bottom: "+=20",
                duration: 1,
                yoyo: true,
                repeat: -1,
            });
        },
        {
            scope: containerHeroRef,
            dependencies: [isIntersecting],
        }
    );

    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    if (!isIntersecting) {
        return (
            <motion.section
                ref={containerHeroRef}
                className={`${styles.hero_container}`}>
                <h1>Loading...</h1>
            </motion.section>
        );
    }

    return (
        <motion.section
            ref={containerHeroRef}
            className={`${styles.hero_container}`}>
            <motion.div className={`${styles.hero_wrapper}`}>
                <motion.p className={`${styles.presentation_text}`}>
                    <span className={`${styles.left_text}`}>Conceptualizamos,</span>
                    <span className={`${styles.right_text}`}>dirigimos y producimos</span>
                    <span className={`${styles.left_text}`}>experiencias artísticas</span>
                    <span className={`${styles.right_text}`}>museográficas</span>
                    <span className={`${styles.left_text}`}>y comerciales</span>
                    <span className={`${styles.right_text}`}>
                        a través de tecnología.
                    </span>
                </motion.p>
            </motion.div>

            <motion.span
                onClick={() => {
                    handleScroll();
                }}
                ref={arrowRef}
                className={`${styles.arrow}`}>
            </motion.span>
            <CustomCursor containerRef={containerHeroRef} />
            <Canvas style={{ height: "100vh" }}>
                <DisplacementGeometry settings={{
                    grid: true,
                    glow: 0.15,
                    columns: 10,
                    orb_size: 0.5,
                    contrast: 5.0,
                    easing_factor: 0.05,
                }} />
            </Canvas>
        </motion.section>
    );
};

export default HeroContainer;
