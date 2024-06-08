// app/first-project/page.tsx
"use client";
import { motion, Spring } from "framer-motion";
import styles from "../page.module.css";

const transitionSpringPhysics: Spring = {
  type: "spring",
  mass: 0.5,
  stiffness: 20,
  damping: 2,
};

const transitionColor = "deepskyblue";

const FirstProject = () => {
  return (
    <motion.div
      className={styles.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: transitionSpringPhysics }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        style={{
          backgroundColor: transitionColor,
          position: "fixed",
          width: "200vw",
          zIndex: 1000,
          bottom: 0,
        }}
        transition={transitionSpringPhysics}
        animate={{ height: "0vh" }}
        exit={{ height: "120vh" }}
      />

      <motion.div
        style={{
          backgroundColor: transitionColor,
          position: "fixed",
          width: "200vw",
          zIndex: 1000,
          top: 0,
        }}
        transition={transitionSpringPhysics}
        initial={{ height: "120vh" }}
        animate={{ height: "0vh", transition: { delay: 0.2 } }}
      />

      <div>
        <h1>First Project</h1>
      </div>
    </motion.div>
  );
};

export default FirstProject;
