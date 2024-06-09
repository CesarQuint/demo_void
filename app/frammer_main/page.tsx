// app/first-project/page.tsx
"use client";
import { useEffect } from "react";
import { motion, Spring, usePresence } from "framer-motion";
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
  useEffect(() => {
    return () => {
      if (!isPresent) {
        safeToRemove();
      }
    };
  }, []);
  return (
    <div className={styles.main}>
      <motion.div
        style={{
          backgroundColor: transitionColor,
          position: "fixed",
          width: "200vw",
          zIndex: 0,
          bottom: 0,
        }}
        transition={transitionSpringPhysics}
        animate={{ height: "0vh" }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        style={{
          backgroundColor: transitionColor,
          position: "fixed",
          width: "200vw",
          zIndex: 0,
          top: 0,
        }}
        transition={transitionSpringPhysics}
        initial={{ height: "120vh" }}
        animate={{ height: "0vh", transition: { delay: 0.5 } }}
      />

      <div className={styles.content}>
        <h1>Main Project</h1>
      </div>
    </div>
  );
};

export default SecondPage;
