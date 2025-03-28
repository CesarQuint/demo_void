"use client";

import { Fluid } from "../../fluid-lib/Fluid";
import { EffectComposer } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../../css/video.hover.module.css";
import eyeIcon from "../../../public/images/EyeIcon.png";
import pauseIcon from "../../../public/images/pause.png";
import gsap from "gsap";
import ImageThree from "./ImageThree";

interface ThreeVideoDistortionInterface {
    source: string;
    thumbnail?: string;
}

const ThreedVideoDistortion: React.FC<ThreeVideoDistortionInterface> = ({
    source,
    thumbnail,
}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const thumbnailRef = useRef<HTMLVideoElement | null>(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const playButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current === null) return;

        const xTo = gsap.quickTo(playButtonRef.current, "x", {
            duration: 0.4,
            ease: "power3",
        });

        const yTo = gsap.quickTo(playButtonRef.current, "y", {
            duration: 0.4,
            ease: "power3",
        });

        const tlHalo = gsap.timeline({
            defaults: { ease: "sine.inOut", duration: 1 },
            repeat: -1,
        });

        tlHalo.to(`.${styles.halo}`, {
            x: "-3vh",
            y: "-3vh",
            width: "18vh",
            height: "18vh",
            opacity: 0,
        });

        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            const playButton = playButtonRef.current?.getBoundingClientRect();
            if (rect && playButton) {
                xTo(e.clientX - rect.left - playButton?.width / 2);
                yTo(e.clientY - rect.top - playButton?.height / 2);
            }
        };

        let a: any = null;
        const handleMouseEnter = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect && playButtonRef.current) {
                const x =
                    e.clientX -
                    rect.left -
                    playButtonRef.current.offsetWidth / 2;
                const y =
                    e.clientY -
                    rect.top -
                    playButtonRef.current.offsetHeight / 2;

                gsap.set(playButtonRef.current, { x, y });

                if (!isScrolling) {
                    a = gsap.to(playButtonRef.current, {
                        opacity: 1,
                        duration: 1,
                    });
                }

                tlHalo.play();
                containerRef.current?.addEventListener(
                    "mousemove",
                    handleMouseMove,
                );
            }
        };

        const handleMouseLeave = () => {
            tlHalo.pause();
            gsap.to(playButtonRef.current, { opacity: 0 });
            a?.kill();
            tlHalo?.kill();
            containerRef.current?.removeEventListener(
                "mousemove",
                handleMouseMove,
            );
        };

        containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
        containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            tlHalo.kill();
            containerRef.current?.removeEventListener(
                "mouseenter",
                handleMouseEnter,
            );
            containerRef.current?.removeEventListener(
                "mousemove",
                handleMouseMove,
            );
            containerRef.current?.removeEventListener(
                "mouseleave",
                handleMouseLeave,
            );
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
            scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
            }, 200);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, []);

    const handleVideoToggle = () => {
        if (videoRef.current && audioRef.current) {
            if (!isPlaying) {
                videoRef.current.play();
                audioRef.current.play();
                thumbnailRef.current?.pause();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                audioRef.current.pause();
                thumbnailRef.current?.play();
                setIsPlaying(false);
            }
        }
    };

    useEffect(() => {
        if (videoRef.current && audioRef.current) {
            // Sync the audio playback position with the video
            videoRef.current.addEventListener("timeupdate", () => {
                if (
                    audioRef.current &&
                    Math.abs(
                        videoRef!.current!.currentTime -
                            audioRef.current.currentTime,
                    ) > 0.1
                ) {
                    audioRef.current.currentTime =
                        videoRef!.current!.currentTime;
                }
            });
        }
    }, []);

    return (
        <div style={source ? {} : { paddingTop: "15vh" }}>
            <div
                ref={containerRef}
                onClick={handleVideoToggle}
                style={{ cursor: "pointer" }}
            >
                <div
                    className={styles.play_button}
                    ref={playButtonRef}
                    style={{ cursor: "pointer" }}
                >
                    <Image
                        className={`${styles.eye_video}`}
                        src={!isPlaying ? eyeIcon : pauseIcon}
                        alt="Eye"
                    />
                    <span className={`${styles.halo}`}></span>
                </div>
                <audio ref={audioRef} src={source} crossOrigin="anonymous" />
                <Canvas
                    orthographic
                    style={{
                        top: 0,
                        left: 0,
                        height: "100vh",
                        width: "100vw",
                        background: "#000000",
                    }}
                >
                    <ImageThree
                        thumbnailSrc={thumbnail}
                        isPlaying={isPlaying}
                        source={source}
                        videoRef={videoRef}
                    />
                    <EffectComposer>
                        <Fluid
                            intensity={4.0}
                            force={1.2}
                            distortion={0.84}
                            curl={2.0}
                            swirl={4}
                            blend={5}
                            fluidColor={"#0080FF"}
                            pressure={0.92}
                            densityDissipation={0.9}
                            velocityDissipation={1.0}
                            radius={0.2}
                        />
                    </EffectComposer>
                </Canvas>
            </div>
        </div>
    );
};

export default ThreedVideoDistortion;
