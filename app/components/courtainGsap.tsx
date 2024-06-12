import React from "react";
import { useAnimate, motion, Spring } from "framer-motion";
import { AnimationSequence } from "framer-motion";
import styles from "../page.module.css";

type Props = {};

const CourtainsGsap = (props: Props) => {
  const [scope2, animate] = useAnimate();
  const [scope3] = useAnimate();
  const [scope4] = useAnimate();
  const transitionSpringPhysics: Spring = {
    type: "spring",
    mass: 0.5,
    stiffness: 20,
    damping: 2,
  };

  const handleClick = async () => {
    const animateCourtain = (target: AnimationSequence, props: any) =>
      animate(target, { height: "50%", backgroundColor: "black", ...props });
    Promise.all([
      animateCourtain(scope2.current, {}),
      animateCourtain(scope3.current, {}),
    ]).then(() => Promise.all([]));
  };

  return (
    <div className={styles.content}>
      <h2>Courtains transition with Gsap</h2>
      <section className={`${styles.cards_container}`}>
        <div className={styles.flex_cards}>
          <motion.div
            onClick={() => {
              handleClick();
            }}
            className={`${styles.card} ${styles._1}`}
          >
            <motion.div
              ref={scope2}
              style={{
                width: "100%",
                height: "0%",
                position: "absolute",
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
                height: "0%",
                position: "absolute",
                left: 0,
                bottom: 0,
              }}
              transition={transitionSpringPhysics}
              className="courtain"
            />
            Up and Down
          </motion.div>
          <motion.div
            onClick={handleClick}
            id="2"
            className={`${styles.card} ${styles._2}`}
          >
            Gsap 1
            <motion.iframe
              className={`${styles.iframe}`}
              src="https://react.dev/reference/react/useRef"
            ></motion.iframe>
          </motion.div>
          <motion.div id="3" className={`${styles.card} ${styles._3}`}>
            <motion.div
              ref={scope4}
              onClick={() => {
                animate(scope4.current, {
                  opacity: 0,
                  transition: { duration: 2 },
                });
              }}
              style={{
                position: "absolute",
                padding: "1rem",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "brown",
              }}
            >
              Gsap 2
            </motion.div>
            <motion.div>Surprise</motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CourtainsGsap;
