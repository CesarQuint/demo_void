"use client";

import { useEffect, useRef } from "react";
import { motion, usePresence, useAnimate, Spring } from "framer-motion";
import styles from "../pageImage.module.css";
import { usePathname } from "next/navigation";
import { useNavigation } from "../utils/navigationContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import mainImage from "../../public/images/large_image.jpeg";
import RepeatTextScrollFx from "../components/gsapComponents";

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
  const { navigationEvent } = useNavigation();
  const router = useRouter();

  useEffect(() => {
    animate(reference.current, { height: "0vh", transition: { delay: 0.2 } });

    return () => {
      if (!isPresent) {
        safeToRemove();
      }
    };
  }, []);

  useEffect(() => {
    if (navigationEvent.href !== pathname) {
      // On navigation event, perform animation with red background
      animate(reference.current, {
        height: "100vh",
        backgroundColor: "green",
        transition: { delay: 0.2 },
      }).then(() => {
        router.push(navigationEvent.href);
      });
    }
  }, [navigationEvent]);

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
      <motion.div className={`${styles.main}`}>
        <h1>Main Project</h1>
        <motion.section>
          <Image
            className={`${styles.main_image}`}
            src={mainImage}
            alt="NO content"
          />
          <h2>Gsap Tests</h2>
          <div>
            <RepeatTextScrollFx />
          </div>
          <div>
            <RepeatTextScrollFx />
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}

export default SecondPage;
