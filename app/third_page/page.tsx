// app/first-project/page.tsx
"use client";
import { useEffect } from "react";
import {
  motion,
  Spring,
  usePresence,
  animate,
  useAnimate,
} from "framer-motion";
import styles from "../page.module.css";

const transitionSpringPhysics: Spring = {
  type: "spring",
  mass: 0.5,
  stiffness: 20,
  damping: 2,
};

const transitionColor = "deepskyblue";

const SecondPage = () => {
  const [isPresent, safeToRemove] = usePresence();
  const [reference, animate] = useAnimate();

  useEffect(() => {
    console.log(isPresent);
    animate(reference.current, {
      height: "0vh",
      transition: { delay: 0.2 },
    });
    return () => {
      console.log("3" + isPresent);
      if (!isPresent) {
        safeToRemove();
      }
    };
  }, []);
  return (
    <div className={styles.main}>
      <motion.div
        ref={reference}
        style={{
          backgroundColor: transitionColor,
          position: "fixed",
          width: "200vw",
          zIndex: 0,
          bottom: 0,
        }}
        initial={{ height: "120vh" }}
        transition={transitionSpringPhysics}
        exit={{ height: "120vh" }}
      />

      <div className={styles.content}>
        <h1>Third Project</h1>
      </div>
    </div>
  );
};

export default SecondPage;
