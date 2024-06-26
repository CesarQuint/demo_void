"use client";

import { useEffect, useRef, useState } from "react";
import { motion, usePresence, useAnimate, Spring } from "framer-motion";
import styles from "../page.module.css";
import { usePathname } from "next/navigation";
import { useNavigation } from "../utils/navigationContext";
import { useRouter } from "next/navigation";
import useWindow from "../utils/hooks/useWindow";
import CourtainsEasy from "../components/courtainsEasy";
import CourtainsGsap from "../components/courtainGsap";
import Timeline from "../components/timeline";

const transitionSpringPhysics: Spring = {
  type: "spring",
  mass: 0.5,
  stiffness: 20,
  damping: 2,
};

const transitionColor = "deepskyblue";

function SecondPage() {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  const animationRef = useRef<HTMLDivElement>(null); // Corrected ref type
  const pathname = usePathname();
  const { navigationEvent } = useNavigation();
  const router = useRouter();

  useEffect(() => {
    if (scope.current) {
      animate(scope.current, {
        height: "0vh",
        transition: { type: "spring", delay: 0.2 },
      });
    }

    return () => {
      if (!isPresent) {
        safeToRemove();
      }
    };
  }, [animate, isPresent, safeToRemove]);

  useEffect(() => {
    if (navigationEvent.href !== pathname) {
      if (scope.current) {
        animate(scope.current, {
          height: "100vh",
          backgroundColor: transitionColor,
          transition: { delay: 0.2 },
        }).then(() => {
          router.push(navigationEvent.href);
        });
      }
    }
  }, [navigationEvent, pathname, router, animate]);

  useEffect(() => {
    console.log(window);
  }, []);

  const a = useWindow();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className={styles.main}>
      <motion.div
        ref={scope}
        style={{
          backgroundColor: transitionColor,
          position: "fixed",
          width: "200vw",
          zIndex: 20,
          bottom: 0,
        }}
        initial={{ height: "120vh" }}
        animate={{ height: "0vh" }}
        transition={transitionSpringPhysics}
        exit={{
          opacity: 0,
          height: "100vh",
          transition: { ease: "easeInOut", duration: 0.5 },
          backgroundColor: "red",
        }}
      />
      {/* <CourtainsEasy />
      <Timeline />
      <CourtainsGsap /> */}
      <motion.div className={`${styles.content}`}>
        <h2>Redirect!!</h2>
      </motion.div>
    </motion.div>
  );
}

export default SecondPage;
