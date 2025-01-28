import React, { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import styles from "../css/title.module.css";
import logo from "../../public/Logo-voidXR-negativo-footer_last.svg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TextLogo: React.FC = () => {
    return (
        <div className={styles.text_rep}>
            <Image className={styles.image_logo} src={logo} alt="voidxr-logo" />
        </div>
    );
};

type TitleProps = {
    iterations?: number;
};

const Title = ({ iterations = 8 }: TitleProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const elems = Array.from(containerRef.current?.children ?? []);
            if (elems.length === 0) return;

            const height = elems[0].clientHeight;

            const calcTargetTop = (idx: number) =>
                idx === 0 ? 0 : (2 * height * idx ** 2) / elems.length ** 2;

            const calcContainerHeight = (): number =>
                calcTargetTop(elems.length) * 1.125;

            const calcYFactor = (idx: number): number =>
                calcTargetTop(elems.length - 1) - calcTargetTop(idx) * 1.15;

            function setTargets(idx: number, el: Element): void {
                gsap.set(el, {
                    top: calcTargetTop(idx),
                    zIndex: idx,
                });
            }

            function setAnimation(idx: number, el: Element): void {
                gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: `${calcTargetTop(idx)} 35%`,
                        end: `${calcTargetTop(elems.length - 1)} 35%`,
                        markers: false,
                        scrub: 2,
                    },
                }).to(el, { y: calcYFactor(idx) }, 0);
            }

            gsap.set(containerRef.current, {
                height: calcContainerHeight(),
            });

            elems.forEach(
                (el, idx) => (setTargets(idx, el), setAnimation(idx, el)),
            );
        },
        {
            scope: containerRef,
            dependencies: [containerRef],
        },
    );

    return (
        <div className={styles.body}>
            <div ref={containerRef} className={styles.content}>
                {Array(iterations)
                    .fill(null)
                    .map((_, idx) => (
                        <TextLogo key={idx} />
                    ))}
            </div>
        </div>
    );
};

export default Title;
