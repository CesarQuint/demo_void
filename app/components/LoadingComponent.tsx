import React from "react";
import { motion } from "framer-motion";
import styles from "../pageImage.module.css";
import TypedLink from "./TypedLink/TypedLink";

const LoadingComponent = ({
  loadingProgress,
  height,
}: {
  loadingProgress: number;
  height: string;
}) => {
  return (
    <div style={{ height }} className={styles.loaderContainer}>
      <div className={styles.bar}>
        <motion.div
          className={styles.loaderBar}
          initial={{ width: "0%" }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <TypedLink viewAnimate={true} href={""}>
        LOADING...
      </TypedLink>
    </div>
  );
};

export default LoadingComponent;
