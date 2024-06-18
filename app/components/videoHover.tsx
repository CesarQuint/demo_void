import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../css/video.hover.module.css";
import gsap from "gsap";
import eyeIcon from "../../public/images/EyeIcon.png";

//TODO : Work in the restart of the animation at out
//TODO: Kill Propertly the animations

const VideoHover: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);
  const [playTriggered, setPlayTtriggered] = useState<boolean>(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.controls = true;
      gsap.to(playButtonRef.current, { opacity: 0, display: "none" });
    }
    setPlayTtriggered(true);
  };

  const handlePause = () => {};

  useEffect(() => {
    if (playTriggered === false) {
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
        const playButton = playButtonRef.current?.getBoundingClientRect();
        if (rect && playButton) {
          xTo(e.clientX - rect.left - playButton?.width / 2);
          yTo(e.clientY - rect.top - playButton?.height / 2);
        }
      };

      let a: any = null;
      const handleMouseEnter = () => {
        a = gsap.to(playButtonRef.current, {
          opacity: 1,
          duration: 1,
          left: "0",
        });

        tlHalo.play();

        // Create quickTo functions for x and y properties
        xTo = gsap.quickTo(playButtonRef.current, "x", {
          duration: 0.4,
          ease: "power3",
        });
        yTo = gsap.quickTo(playButtonRef.current, "y", {
          duration: 0.4,
          ease: "power3",
        });
        containerRef.current?.addEventListener("mousemove", handleMouseMove);
      };

      const handleMouseLeave = () => {
        tlHalo.pause();
        gsap.to(playButtonRef.current, { opacity: 0 });
        containerRef.current?.removeEventListener("mousemove", handleMouseMove);
        a.kill();
        tlHalo.kill();
      };

      containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
      containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        containerRef.current?.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
        containerRef.current?.removeEventListener("mousemove", handleMouseMove);
        containerRef.current?.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
        tlHalo.kill();
      };
    }
  }, [playTriggered]);

  return (
    <motion.div>
      <motion.div
        className={styles.video_wrapper}
        ref={containerRef}>
        <motion.div
          className={styles.play_button}
          ref={playButtonRef}
          onClick={handlePlay}
          style={{ cursor: "pointer", position: "absolute" }}>
          <Image
            src={eyeIcon}
            alt="Eye"
          />
          <span className={`${styles.halo}`}></span>
        </motion.div>
        <video
          onPause={() => {
            handlePause();
          }}
          className={`${styles.video}`}
          ref={videoRef}
          controls={playTriggered}
          src="/videos/cdmx.mp4">
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </motion.div>
  );
};

export default VideoHover;
