import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../css/video.hover.module.css";
import gsap from "gsap";
import eyeIcon from "../../public/images/EyeIcon.png";
import pauseIcon from "../../public/images/pause.png";
import useWindow from "../utils/hooks/useWindow";

const VideoHover: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const playButtonRef = useRef<HTMLDivElement>(null);
    const [playTriggered, setPlayTtriggered] = useState<boolean>(false);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const windowStatus = useWindow();

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setPlayTtriggered(true);
        }
    };

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setPlayTtriggered(false);
        }
    };

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

    return (
        <motion.div className={`${styles.video_container}`}>
            <motion.div className={styles.video_wrapper} ref={containerRef}>
                <motion.div
                    className={styles.play_button}
                    ref={playButtonRef}
                    onClick={() => {
                        !playTriggered ? handlePlay() : handlePause();
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <Image
                        className={`${styles.eye_video}`}
                        src={!playTriggered ? eyeIcon : pauseIcon}
                        alt="Eye"
                    />
                    <span className={`${styles.halo}`}></span>
                </motion.div>
                <video
                    onPause={handlePause}
                    className={`${styles.video}`}
                    controls={windowStatus.innerWidth <= 700 && true}
                    ref={videoRef}
                    poster={
                        windowStatus.innerWidth >= 700
                            ? "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/thumbnails/VOIDXR%20DEMO%20EYECANDY%20Thumbnail.png"
                            : "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/thumbnails/VOIDXR%20DEMO%20EYECANDY%20Thumbnail%20movil.png"
                    }
                    src={
                        windowStatus.innerWidth >= 700
                            ? "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-eyecandy-home.mp4"
                            : "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-eyecandy-home-mobile.mp4"
                    }
                >
                    Your browser does not support the video tag.
                </video>
            </motion.div>
        </motion.div>
    );
};

export default VideoHover;
