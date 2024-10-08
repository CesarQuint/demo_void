import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import styles from "./Home/pageImage.module.css";

const TypedLink = dynamic(() => import("./TypedLink/TypedLink"), {
    ssr: false,
});

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
