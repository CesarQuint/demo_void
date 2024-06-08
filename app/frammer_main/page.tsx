// app/page.tsx
"use client";
import { motion } from "framer-motion";
import styles from "../page.module.css";

const HomePage = () => {
  return (
    <motion.div
      className={styles.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <div>
        <h1>Home Page</h1>
      </div>
    </motion.div>
  );
};

export default HomePage;
