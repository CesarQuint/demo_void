"use client";

import { Fluid } from "../../fluid-lib/Fluid";
import { EffectComposer } from "@react-three/postprocessing";
import { Canvas, useThree } from "@react-three/fiber";
import { useVideoTexture } from "@react-three/drei";
import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import styles from "../../css/video.hover.module.css";
import eyeIcon from "../../../public/images/EyeIcon.png";
import pauseIcon from "../../../public/images/pause.png";
import gsap from "gsap";
import { ShaderMaterial, PerspectiveCamera, OrthographicCamera } from "three";
import useWindow from "@/app/utils/hooks/useWindow";

type ImageProps = {
    videoRef: React.MutableRefObject<HTMLVideoElement | null>;
};

const ImageThree: React.FC<ImageProps> = ({ videoRef }) => {
    const texture = useVideoTexture(
        "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-eyecandy-home.mp4",
        {
            muted: true,
            crossOrigin: "anonymous",
        },
    );

    const widndowStatus = useWindow();

    const { camera, size } = useThree();

    const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

    useEffect(() => {
        if (texture?.image instanceof HTMLVideoElement) {
            videoRef.current = texture.image;
            videoRef.current.pause();
        }
    }, [texture, videoRef]);

    useEffect(() => {
        if (widndowStatus.innerWidth == 0) return;
        const handleResize = () => {
            let planeWidth, planeHeight;

            // Check if the camera is a PerspectiveCamera
            if (camera instanceof PerspectiveCamera) {
                const fov = camera.fov * (Math.PI / 180); // Convert FoV from degrees to radians
                const distance = 5; // You can adjust this depending on the desired distance from the camera
                const visibleHeight = 2 * Math.tan(fov / 2) * distance;
                const aspectRatio = size.width / size.height;
                planeWidth = visibleHeight * aspectRatio;

                // Adjust the plane's width and height based on 85% width of viewport
                const widthPercentage = 1.68; // 85% of viewport width
                planeWidth = widthPercentage * planeWidth;
                planeHeight =
                    planeWidth /
                    (texture?.image?.videoWidth / texture?.image?.videoHeight);
            } else if (camera instanceof OrthographicCamera) {
                // For OrthographicCamera, calculate the width and height based on camera's view box
                const aspectRatio = size.width / size.height;
                planeWidth = camera.right - camera.left;
                planeHeight = planeWidth / aspectRatio;
                planeWidth = 0.85 * planeWidth; // Adjust for 85% of width
            }

            setDimensions({
                width: planeWidth!,
                height: planeHeight!,
            });
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [widndowStatus.innerWidth]);

    const material = useMemo(() => {
        return new ShaderMaterial({
            uniforms: {
                u_texture: { value: texture },
                u_radius: { value: 0.06 }, // Adjust for corner rounding
            },
            vertexShader: `
                varying vec2 vUv;

                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform sampler2D u_texture;
                uniform float u_radius;

                void main() {
                    vec2 uv = vUv - 0.5;
                    uv *= 2.0;

                    // Calculate distance from the center
                    float distance = length(max(abs(uv) - vec2(1.0 - u_radius), 0.0));
                    
                    // Discard pixels outside the rounded rectangle
                    if (distance > u_radius) {
                        discard;
                    }

                    gl_FragColor = texture2D(u_texture, vUv);
                }
            `,
        });
    }, [texture]);

    return (
        <mesh position-z={-4}>
            <planeGeometry
                args={[dimensions.width, dimensions.height, 20, 20]}
                attach="geometry"
            />
            <primitive object={material} attach="material" />
        </mesh>
    );
};

const ThreedVideoDistortion: React.FC = () => {
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

            containerRef.current?.addEventListener(
                "mouseenter",
                handleMouseEnter,
            );
            containerRef.current?.addEventListener(
                "mouseleave",
                handleMouseLeave,
            );

            return () => {
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
        <div style={{ paddingTop: "15vh" }}>
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
                <audio
                    ref={audioRef}
                    src="https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-eyecandy-home.mp4"
                    crossOrigin="anonymous"
                />
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
