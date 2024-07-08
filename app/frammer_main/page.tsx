"use client";
import { useEffect, useRef } from "react";
import { motion, usePresence, useAnimate, Spring } from "framer-motion";
import styles from "../pageImage.module.css";
import { usePathname } from "next/navigation";
import { useNavigation } from "../utils/navigationContext";
import { useRouter } from "next/navigation";
import { AnimationSequence } from "framer-motion";
import { animate as animation } from "framer-motion";

import Footer from "../components/footer";
import HeroContainer from "../components/Home/HeroContainer";
import VideoHover from "../components/videoHover";
import Video from "../components/Three/Video";

import RepeatTextScrollFx from "../components/gsapComponents";
import ProjectImages from "../components/Home/ProjectImages";
import { VortexGeometry } from "../hero_demo/VortexGeometry";
import { Canvas } from "@react-three/fiber";
import ProcessHome from "../components/Home/ProcessHome";

const transitionSpringPhysics: Spring = {
  type: "spring",
  mass: 0.5,
  stiffness: 20,
  damping: 2,
};

const transitionColor = "deepskyblue";

function SecondPage() {
  const [isPresent, safeToRemove] = usePresence();
  const [scope2, animate] = useAnimate();
  const [scope3] = useAnimate();
  const pathname = usePathname();
  const { navigationEvent } = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const sequence: AnimationSequence = [
      [
        scope2.current,
        { height: "0%", top: "50%", backgroundColor: "black" },
        { duration: 0.4 },
      ],
      [
        scope3.current,
        { height: "0%", bottom: "50%", backgroundColor: "black" },
        { at: "<", duration: 0.4 },
      ],
    ];

    animation(sequence);
    return () => {
      if (!isPresent) {
        safeToRemove();
      }
    };
  }, []);

  useEffect(() => {
    if (navigationEvent.href !== pathname) {
      const sequence: AnimationSequence = [
        [
          scope2.current,
          { height: "51%", top: "0", backgroundColor: "black" },
          { duration: 0.4 },
        ],
        [
          scope3.current,
          { height: "51%", bottom: "0", backgroundColor: "black" },
          { at: "<", duration: 0.4 },
        ],
      ];

      animation(sequence).then(() => {
        router.push(navigationEvent.href);
      });
    }
  }, [navigationEvent, pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className={`${styles.main}`}>
      <motion.div
        ref={scope2}
        style={{
          width: "100%",
          height: "52%",
          position: "fixed",
          zIndex: 50,
          left: 0,
          top: 0,
        }}
        transition={transitionSpringPhysics}
        className="courtain"
      />
      <motion.div
        ref={scope3}
        style={{
          width: "100%",
          height: "52%",
          zIndex: 50,
          position: "fixed",
          left: 0,
          bottom: 0,
        }}
        transition={transitionSpringPhysics}
        className="courtain"
      />
      <section>
        <Canvas style={{ height: "100vh" }}>
          <VortexGeometry />
        </Canvas>
      </section>

      {/* <VideoHover /> */}
      <Video />
      <ProjectImages />
      <ProcessHome />
      <Footer />
    </motion.div>
  );
}

export default SecondPage;
