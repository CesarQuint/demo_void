import React from "react";
import { useAnimate, motion, Spring } from "framer-motion";
import styles from "../page.module.css";

type Props = {};

const CourtainsEasy = (props: Props) => {
    const [scope2, animate] = useAnimate();
    const [scope3] = useAnimate();
    const [scope4] = useAnimate();
    const transitionSpringPhysics: Spring = {
        type: "spring",
        mass: 0.5,
        stiffness: 20,
        damping: 2,
    };

    const handleClick = () => {
        animate(scope3.current, {
            position: "fixed",
            left: "0rem",
            top: "3rem",
            width: "100%",
            height: "100%",
            zIndex: "10",
            transition: {
                type: "spring",
                duration: 2,
                ease: "easeInOut",
            },
        });
    };

    return (
        <div className={styles.content}>
            <h1>Playground Area</h1>
            <h2>Courtains transition</h2>
            <section className={`${styles.cards_container}`}>
                <div className={styles.flex_cards}>
                    <motion.div
                        onClick={() => {
                            animate(scope2.current, {
                                backgroundColor: "red",
                                width: "100%",
                                height: "100%",
                                transition: { delay: 0.2 },
                            });
                        }}
                        className={`${styles.card} ${styles._1}`}
                    >
                        <motion.div
                            ref={scope2}
                            style={{
                                width: "0%",
                                height: "100%",
                                position: "absolute",
                                left: 0,
                                top: 0,
                            }}
                            transition={transitionSpringPhysics}
                            className="courtain"
                        />
                        card 1
                    </motion.div>
                    <motion.div
                        onClick={handleClick}
                        id="2"
                        className={`${styles.card} ${styles._2}`}
                    >
                        card 2
                        <motion.iframe
                            className={`${styles.iframe}`}
                            ref={scope3}
                            src="https://react.dev/reference/react/useRef"
                        ></motion.iframe>
                    </motion.div>
                    <motion.div
                        id="3"
                        className={`${styles.card} ${styles._3}`}
                    >
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
                            Click me!
                        </motion.div>
                        <motion.div>Surprise</motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default CourtainsEasy;
