"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../css/tags.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { AboutUsTag } from "../constants/tags_text";
import useWindow from "../utils/hooks/useWindow";
import Image from "next/image";
import { useNavigation } from "../utils/navigationContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
    contentArr: AboutUsTag[];
};

type TagsContentProps = {
    i: number;
    img: string;
    number: string;
    title: string;
    content: string[];
    setImageLoaded: Dispatch<SetStateAction<boolean>>;
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
                        onLoad={() => {
                            props.setImageLoaded(true);
                        }}
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
                        onLoad={() => {
                            props.setImageLoaded(true);
                        }}
                        width={1000}
                        height={1000}
                        className={styles.image}
                        src={props.img}
                        alt="image_card"
                    />
                </section>
                <article className={styles.right_content}>
                    <section>
                        <p className={styles.right_numeral}>{props.number}</p>
                        <h5 className={styles.title}>{props.title}</h5>
                    </section>
                    <div className={styles.right_text_content}>
                        {props.content.map((text, i) => (
                            <p key={i}>{text}</p>
                        ))}
                    </div>
                </article>
            </>
        );
    }
};

const Tags: React.FC<Props> = (props: Props) => {
    const [imgLoad, setImageLoad] = useState(false);
    const tagsRef = useRef<(HTMLDivElement | null)[]>([]);
    const { navigationEvent, setNavigationEvent } = useNavigation();
    const container = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            if (!imgLoad || !container.current) return;

            const tags = tagsRef.current.filter((el) => el !== null);
            const heights = tags.map((el) => el.offsetHeight);
            const space = 20;

            gsap.set(container.current, {
                height: heights.reduce((s, h) => s + h + space, 0),
            });

            gsap.set(tags, {
                top: (i, el) => heights[0] - el.offsetHeight + space * i,
                zIndex: (i) => tags.length - i,
                borderColor: (i) => `rgba(128, 128, 128, ${1 - i * 0.3})`,
            });

            gsap.set(tags.slice(1), { scale: (i) => 0.95 - i * 0.04 });

            const positions = tags.map(() => ({ y: 0 }));
            const loaded = tags.map(() => false);

            function startScroll(i: number) {
                if (loaded[i] || i === tags.length - 1) return;
                loaded[i] = true;

                const duration = Math.max(...heights);
                const start = heights[0] / 2 + duration * i;
                const y = positions[i].y + heights[i + 1];

                gsap.timeline({
                    defaults: {
                        ease: "none",
                    },
                    scrollTrigger: {
                        trigger: container.current,
                        start: `${start} center`,
                        end: `+=${duration} center`,
                        // markers: true,
                        scrub: 0,
                        onLeave() {
                            startScroll(i + 1);
                        },
                    },
                })
                    .to(tags[i + 1], { scale: 1 }, 0)
                    .to(tags.slice(i + 1), { y: `+=${y}` }, 0)
                    .to(
                        tags[i + 1],
                        {
                            borderColor: gsap.getProperty(
                                tags[i],
                                "borderColor",
                            ),
                        },
                        0,
                    );
            }

            startScroll(0);
        },
        {
            scope: container,
            dependencies: [
                setNavigationEvent,
                navigationEvent,
                container,
                imgLoad,
            ],
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
                                setImageLoaded={setImageLoad}
                            />
                        </div>
                    ))}
                </motion.section>
            </motion.div>
        </motion.div>
    );
};

export default Tags;
