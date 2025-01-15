"use client";
import React, { useRef } from "react";
import styles from "../css/tags.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { AboutUsTag } from "../constants/tags_text";
import useWindow from "../utils/hooks/useWindow";
import Image from "next/image";
import { useNavigation } from "../utils/navigationContext";

gsap.registerPlugin(ScrollTrigger);

type Props = {
    contentArr: AboutUsTag[];
};

type TagsContentProps = {
    i: number;
    img: string;
    number: string;
    title: string;
    content: string[];
};

const TagsContent: React.FC<TagsContentProps> = (props) => {
    const windowStatus = useWindow();

    if (windowStatus && windowStatus.innerWidth < 768) {
        return (
            <>
                <section className={`${styles.mobile_head}`}>
                    <p className={styles.right_numeral}>{props.number}</p>
                    <h5 className={styles.title}>{props.title}</h5>
                </section>
                <section className={styles.image_wrapper}>
                    <Image
                        width={1000}
                        height={1000}
                        className={styles.image}
                        src={props.img}
                        alt="image_card"
                    />
                </section>
                <div className={styles.right_text_content}>
                    {props.content.map((text, i) => (
                        <p key={i}>{text}</p>
                    ))}
                </div>
            </>
        );
    }

    if (windowStatus && windowStatus.innerWidth > 768) {
        return (
            <>
                <section className={styles.left_content}>
                    <Image
                        width={1000}
                        height={1000}
                        className={styles.image}
                        src={props.img}
                        alt="image_card"
                    />
                </section>
                <section className={styles.right_content}>
                    <section>
                        <p className={styles.right_numeral}>{props.number}</p>
                        <h5 className={styles.title}>{props.title}</h5>
                    </section>
                    <div className={styles.right_text_content}>
                        {props.content.map((text, i) => (
                            <p key={i}>{text}</p>
                        ))}
                    </div>
                </section>
            </>
        );
    }
};

const Tags: React.FC<Props> = (props: Props) => {
    const tagsRef = useRef<(HTMLDivElement | null)[]>([]);
    const { navigationEvent, setNavigationEvent } = useNavigation();
    const container = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const tags = tagsRef.current.filter((el) => el !== null);
            const heights = tags.map((el) => el.offsetHeight);
            const space = 20;

            const calcContainerHeight = (): number =>
                heights.reduce((s, h) => s + h + space, 0);

            function setTargets(tag: HTMLDivElement, idx: number): void {
                const calcScale = (): number => 0.95 - idx * 0.04;
                const calcZIndex = (): number => tags.length - idx;
                const calcBorderColor = (): string =>
                    `rgba(128, 128, 128, ${1 - idx * 0.3})`;
                const calcDisplacement = (): number => space * idx;

                gsap.set(tag, {
                    top: () => calcDisplacement(),
                    scale: () => calcScale(),
                    zIndex: () => calcZIndex(),
                    borderColor: () => calcBorderColor(),
                });

                Array.from(tag.children).forEach((child) =>
                    gsap.set(child, { opacity: () => 1 - idx * 1 }),
                );
            }

            function startScroll(tag: HTMLDivElement, idx: number): void {
                const yFactor = heights
                    .slice(0, idx)
                    .reduce((p, c) => p + c + space, 0);

                gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: container.current,
                        start: `${heights[0]} 76%`,
                        end: `+=${((heights[idx - 1] ?? 0) + space) * idx} 76%`,
                        markers: false,
                        scrub: 1,
                        preventOverlaps: false,
                        fastScrollEnd: false,
                    },
                })
                    .to(
                        tag,
                        {
                            y: yFactor,
                            scale: 1,
                            borderColor: `rgba(128, 128, 128, 1)`,
                        },
                        0,
                    )
                    .to(Array.from(tag.children), { opacity: 1 }, 0);
            }

            gsap.set(container.current, {
                height: calcContainerHeight(),
            });

            tags.forEach((tag, i) => (setTargets(tag, i), startScroll(tag, i)));
        },
        {
            scope: container,
            dependencies: [setNavigationEvent, navigationEvent, container],
        },
    );

    const setTagsRefAt = (ref: HTMLDivElement | null, idx: number): void =>
        void (tagsRef.current[idx] = ref);

    return (
        <motion.div className={`${styles.main}`}>
            <motion.div className={`${styles.tags_wrapper}`}>
                <motion.section
                    className={`${styles.tags_container}`}
                    ref={container}
                >
                    {props.contentArr.map((_, i) => (
                        <div
                            key={i}
                            className={`${styles.tag}`}
                            ref={(el) => setTagsRefAt(el, i)}
                        >
                            <TagsContent
                                i={i}
                                img={_.img}
                                title={_.title}
                                number={_.number}
                                content={_.content}
                            />
                        </div>
                    ))}
                </motion.section>
            </motion.div>
        </motion.div>
    );
};

export default Tags;
