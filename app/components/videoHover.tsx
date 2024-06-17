import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "../css/video.hover.module.css";
import gsap from "gsap";

const VideoHover: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.controls = true;
    }
  };

  useEffect(() => {
    let xTo: any, yTo: any;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        xTo(e.clientX - rect.left - 30);
        yTo(e.clientY - rect.top - 30);
      }
    };

    const handleMouseEnter = () => {
      // Create quickTo functions for x and y properties
      xTo = gsap.quickTo(playButtonRef.current, "x", {
        duration: 0.6,
        ease: "power3",
      });
      yTo = gsap.quickTo(playButtonRef.current, "y", {
        duration: 0.6,
        ease: "power3",
      });
      containerRef.current?.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    };

    containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div>
      <motion.div className={styles.video_wrapper} ref={containerRef}>
        <motion.div
          className={styles.play_button}
          ref={playButtonRef}
          onClick={handlePlay}
          style={{ cursor: "pointer", position: "absolute" }}
        >
          Play
        </motion.div>
        <video ref={videoRef} controls={false} src="/videos/cdmx.mp4">
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </motion.div>
  );
};

export default VideoHover;
