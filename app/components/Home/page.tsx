"use client";
import { useEffect, useRef, useState } from "react";
import { motion, usePresence, useAnimate, Spring } from "framer-motion";
import styles from "./pageImage.module.css";
import { usePathname } from "next/navigation";
import { useNavigation } from "./utils/navigationContext";
import { useRouter } from "next/navigation";
import { AnimationSequence } from "framer-motion";
import { animate as animation } from "framer-motion";

import Footer from "./components/footer";
import HeroContainer from "./components/Home/HeroContainer";

import ProcessHome from "./components/Home/ProcessHome";
import PreFooterLink from "./components/PreFooterLink";
import TagsHome from "./components/Home/TagsHome";
import dynamic from "next/dynamic";
import useWindow from "./utils/hooks/useWindow";
import LoadingComponent from "./components/LoadingComponent";

const ProjectImages = dynamic(() => import("./components/Home/ProjectImages"), {
  ssr: false,
});

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
  const windowStatus = useWindow();

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [requestFullfilled, setRequestFullfilled] = useState(false);

  const fetchTest = async () => {
    setRequestFullfilled(false);
    setLoadingProgress(0);

    // Simulate a 4-second delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setRequestFullfilled(true);
  };

  useEffect(() => {
    if (requestFullfilled) {
      setLoadingProgress(100);
    } else {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => (prev < 100 ? prev + 25 : prev));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [requestFullfilled]);

  useEffect(() => {
    fetchTest();
  }, []);

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
      className={`${styles.main}`}
    >
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

      {requestFullfilled ? (
        <>
          <HeroContainer />
          <motion.div className={styles.video_container}>
            <video
              autoPlay={true}
              muted={true}
              className={styles.video}
              src={
                windowStatus.innerWidth >= 700
                  ? "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-eyecandy-home.mp4"
                  : "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-eyecandy-home-mobile.mp4"
              }
              controls={true}
            />
          </motion.div>
          <ProjectImages />
          <ProcessHome />
          <TagsHome />
          <div style={{ height: "10vh" }}></div>
          <PreFooterLink href="/about" text="CONOCENOS" />
          <div style={{ height: "5vh" }}></div>
          <Footer />
        </>
      ) : (
        <LoadingComponent height="100vh" loadingProgress={loadingProgress} />
      )}
    </motion.div>
  );
}

export default SecondPage;
