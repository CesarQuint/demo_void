"use client";

import { useEffect, useRef } from "react";
import { motion, usePresence, useAnimate, Spring } from "framer-motion";
import styles from "../page.module.css";
import { usePathname } from "next/navigation";

const transitionSpringPhysics: Spring = {
  type: "spring",
  mass: 0.5,
  stiffness: 20,
  damping: 2,
};

const transitionColor = "deepskyblue";

function SecondPage() {
  const [isPresent, safeToRemove] = usePresence();
  const reference = useRef(null);
  const [scope, animate] = useAnimate();
  const pathname = usePathname();

  useEffect(() => {
    animate(reference.current, { height: "0vh", transition: { delay: 0.2 } });

    return () => {
      if (!isPresent) {
        safeToRemove();
      }
    };
  }, [animate, isPresent, safeToRemove]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className={styles.main}
    >
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
        animate={{ height: "0vh" }}
        transition={transitionSpringPhysics}
        exit={{
          opacity: 0,
          height: "100vh",
          transition: { ease: "easeInOut", duration: 0.5 },
          backgroundColor: "red",
        }}
      />
      <div className={styles.content}>
        <h1>Third Project</h1>
      </div>
    </motion.div>
  );
}

export default SecondPage;
