"use client";

import { Fluid } from "@whatisjery/react-fluid-distortion";
import { EffectComposer } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { useVideoTexture } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import VideoHover from "../components/videoHover";
import styles from "../css/video.hover.module.css";
import eyeIcon from "../../public/images/EyeIcon.png";
import pauseIcon from "../../public/images/pause.png";
import gsap from "gsap";

type ImageProps = {
    videoRef: React.MutableRefObject<HTMLVideoElement | null>;
};

const ImageThree: React.FC<ImageProps> = ({ videoRef }) => {
    const texture = useVideoTexture("/videos/cdmx.mp4", {
        muted: true,
    });

    const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

    useEffect(() => {
        if (texture?.image instanceof HTMLVideoElement) {
            videoRef.current = texture.image;
            videoRef.current.pause();
        }
    }, [texture, videoRef]);

    useEffect(() => {
        const handleResize = () => {
            const scaleFactor = 1.4; // Adjust for 90% coverage
            const width = (scaleFactor * window.innerWidth) / 100;
            const height = (scaleFactor * window.innerHeight) / 100;
            setDimensions({ width, height });
        };

        // Set initial dimensions
        handleResize();

        // Update on resize
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <mesh position-z={-4}>
            <planeGeometry
                args={[dimensions.width, dimensions.height, 20, 20]}
                attach="geometry"
            />
            <meshBasicMaterial map={texture} color="#c4b4d2" />
        </mesh>
    );
};

const Page: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null); // Add an audio reference

    //Hover area :
    const [playTriggered, setPlayTtriggered] = useState<boolean>(false);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const playButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current !== null) {
            let xTo: any, yTo: any;

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
                const playButton =
                    playButtonRef.current?.getBoundingClientRect();
                if (rect && playButton) {
                    xTo(e.clientX - rect.left - playButton?.width / 2);
                    yTo(e.clientY - rect.top - playButton?.height / 2);
                }
            };

            let a: any = null;
            const handleMouseEnter = (e: MouseEvent) => {
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect && playButtonRef.current) {
                    // Calculate initial position of the play button relative to the container
                    const x =
                        e.clientX -
                        rect.left -
                        playButtonRef.current.offsetWidth / 2;
                    const y =
                        e.clientY -
                        rect.top -
                        playButtonRef.current.offsetHeight / 2;

                    // Immediately position the play button
                    gsap.set(playButtonRef.current, { x, y });

                    // Create quickTo functions for smooth animations
                    xTo = gsap.quickTo(playButtonRef.current, "x", {
                        duration: 0.4,
                        ease: "power3",
                    });

                    yTo = gsap.quickTo(playButtonRef.current, "y", {
                        duration: 0.4,
                        ease: "power3",
                    });

                    if (!isScrolling) {
                        a = gsap.to(playButtonRef.current, {
                            opacity: 1,
                            duration: 1,
                        });
                    }

                    tlHalo.play();
                    containerRef.current?.addEventListener(
                        "mousemove",
                        handleMouseMove
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
                    handleMouseMove
                );
            };

            containerRef.current?.addEventListener(
                "mouseenter",
                handleMouseEnter
            );
            containerRef.current?.addEventListener(
                "mouseleave",
                handleMouseLeave
            );

            return () => {
                containerRef.current?.removeEventListener(
                    "mouseenter",
                    handleMouseEnter
                );
                containerRef.current?.removeEventListener(
                    "mousemove",
                    handleMouseMove
                );
                containerRef.current?.removeEventListener(
                    "mouseleave",
                    handleMouseLeave
                );
                tlHalo.kill();
            };
        }
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

    // End Hover area

    const handleVideoToggle = () => {
        if (videoRef.current && audioRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                audioRef.current.play(); // Play the audio when the video plays
                setPlayTtriggered(true);
            } else {
                videoRef.current.pause();
                audioRef.current.pause(); // Pause the audio when the video pauses
                setPlayTtriggered(false);
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
                            audioRef.current.currentTime
                    ) > 0.1
                ) {
                    audioRef.current.currentTime =
                        videoRef!.current!.currentTime;
                }
            });
        }
    }, []);

    return (
        <div>
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
                        src={!playTriggered ? eyeIcon : pauseIcon}
                        alt="Eye"
                    />
                    <span className={`${styles.halo}`}></span>
                </div>
                <audio ref={audioRef} src="/videos/cdmx.mp4" />
                <Canvas
                    style={{
                        top: 0,
                        left: 0,
                        height: "100vh",
                        width: "100vw",
                        background: "#000000",
                    }}
                >
                    <ImageThree videoRef={videoRef} />
                    <EffectComposer>
                        <Fluid fluidColor={"#000"} />
                    </EffectComposer>
                </Canvas>
            </div>
        </div>
    );
};

export default Page;
