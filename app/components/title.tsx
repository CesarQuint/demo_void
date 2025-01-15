import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import styles from "../css/title.module.css";
import logo from "../../public/void_Nb.svg";
import { motion } from "framer-motion";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useIntersectionObserver } from "../utils/hooks/useIntersectionObserver";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(useGSAP);

type Props = {};

type TextLogoProps = {
    position: number;
    nameRef: string;
    offset?: string;
    margin?: number;
};

const TextLogo = (props: TextLogoProps) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<GSAPTimeline | null>(null);
    const [imgLoaded, setImgLoaded] = useState(false);
    const { isIntersecting, ref: containerRef } =
        useIntersectionObserver("900px");

    useGSAP(
        () => {
            if (isIntersecting) {
                timelineRef.current?.kill();

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: `${props.offset} center`,
                        end: "bottom center",
                        scrub: 0,
                    },
                });

                tl.to(imageRef.current, {
                    marginTop: `+=${props.margin! + 1}px`,
                    ease: "none",
                });

                timelineRef.current = tl;

                return () => {
                    timelineRef.current?.kill();
                };
            }
        },
        { scope: containerRef, dependencies: [isIntersecting, imgLoaded] },
    );

    return (
        <motion.div
            ref={containerRef}
            style={{ height: `${props.position}px`, willChange: "transform" }}
            className={`${styles.text_rep}`}
        >
            <motion.div ref={imageRef}>
                <Image
                    onLoad={() => {
                        setImgLoaded(true);
                    }}
                    className={`${styles.image_logo} ${props.nameRef}`}
                    src={logo}
                    alt="logo"
                />
            </motion.div>
        </motion.div>
    );
};

const Title = (props: Props) => {
    const logoRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<number[]>([]);
    const [imgLoaded, setImgLoaded] = useState(false);

    useEffect(() => {
        if (logoRef.current !== null) {
            const height = logoRef.current.clientHeight;
            const newPositions = [];
            for (let index = 1; index < 8; index++) {
                let prop = index * 0.08;
                let percentage = height * (0.7 - prop);
                newPositions.push(percentage);
            }
            setPositions(newPositions);
        }
    }, []);

    return (
        <motion.div className={`${styles.body}`}>
            <motion.div className={`${styles.content}`}>
                {positions.length && (
                    <>
                        <TextLogo
                            nameRef="one"
                            position={positions[6]}
                            margin={positions[6]}
                            offset="top"
                        />
                        <TextLogo
                            nameRef="two"
                            position={positions[5]}
                            margin={positions[5]}
                            offset="-25%"
                        />
                        <TextLogo
                            nameRef="three"
                            position={positions[4]}
                            margin={positions[4]}
                            offset="-20%"
                        />
                        <TextLogo
                            nameRef="four"
                            position={positions[3]}
                            margin={positions[3]}
                            offset="-20%"
                        />
                        <TextLogo
                            nameRef="five"
                            position={positions[2]}
                            margin={positions[2]}
                            offset="-20%"
                        />
                        <TextLogo
                            nameRef="six"
                            position={positions[1]}
                            margin={positions[1]}
                            offset="-20%"
                        />
                        <TextLogo
                            nameRef="seven"
                            position={positions[0]}
                            margin={positions[0]}
                            offset="-20%"
                        />
                    </>
                )}
                <div ref={logoRef} className={`${styles.text_rep}`}>
                    <Image
                        onLoad={() => {
                            setImgLoaded(true);
                        }}
                        className={`${styles.image_logo}`}
                        src={logo}
                        alt="logo"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Title;
