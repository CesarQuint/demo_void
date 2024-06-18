"use client";

import { useEffect, useRef } from "react";
import { motion, usePresence, useAnimate, Spring } from "framer-motion";
import styles from "../pageImage.module.css";
import { usePathname } from "next/navigation";
import { useNavigation } from "../utils/navigationContext";
import { useRouter } from "next/navigation";
import { AnimationSequence } from "framer-motion";
import { animate as animation } from "framer-motion";
import Tags from "../components/tags";

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
  const [scope2, animate] = useAnimate();
  const [scope3] = useAnimate();
  const pathname = usePathname();
  const { navigationEvent } = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const sequence: AnimationSequence = [
      [
        scope2.current,
        { height: "0%", top: "50%", backgroundColor: "black" },
        { duration: 0.6 },
      ],
      [
        scope3.current,
        { height: "0%", bottom: "50%", backgroundColor: "black" },
        { at: "<", duration: 0.6 },
      ],
    ];
    // animate(scope2.current, {height: "0%",top:"50%",backgroundColor:"black"},);
    // animate(scope3.current, { height: "0%",bottom:"50%",backgroundColor:"black"});
    animation(sequence);
    return () => {
      if (!isPresent) {
        safeToRemove();
      }
    };
  }, []);

  useEffect(() => {
    if (navigationEvent.href !== pathname) {
      // On navigation event, perform animation with red background
      Promise.all([
        animate(scope2.current, {
          height: "50%",
          top: "0",
          backgroundColor: "black",
        }),
        animate(scope3.current, {
          height: "50%",
          bottom: "0",
          backgroundColor: "black",
        }),
      ]).then(() => {
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
      className={styles.main}>
      <motion.div
        ref={scope2}
        style={{
          width: "100%",
          height: "50%",
          position: "absolute",
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
          height: "50%",
          zIndex: 50,
          position: "absolute",
          left: 0,
          bottom: 0,
        }}
        transition={transitionSpringPhysics}
        className="courtain"
      />
      <motion.div className={`${styles.main}`}>
        <h1>Main Project</h1>
        <motion.section>
          <div>
            <RepeatTextScrollFx
              text="BOCA"
              words={12}
            />
          </div>
          <section>
            <Tags />
          </section>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}

export default SecondPage;
