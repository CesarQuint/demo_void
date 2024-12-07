import React, { RefObject, useContext } from "react";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../components/Buttons";
import { Card } from "../CardTemplate";
import { FormContext } from "../Context/ContextForm";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface CustomCardProps {
    cardRef: RefObject<HTMLDivElement>;
    clickHandler: (ref: RefObject<HTMLDivElement>) => void;
    returnHandler: () => void;
}

export const AboutYourProjectCard: React.FC<CustomCardProps> = ({
    cardRef,
    clickHandler,
    returnHandler,
}) => {
    const { userExperience, setUserExperience } = useContext(FormContext);

    const { contextSafe } = useGSAP();

    const shakeAnimation = contextSafe(
        (ref: React.RefObject<HTMLDivElement>) => {
            const tl = gsap.timeline({
                repeat: 1,
                ease: "elastic.inOut(1,0.3)",
            });
            tl.to(ref.current, { x: "-1%", duration: 0.08 })
                .to(ref.current, { x: "1%", duration: 0.08 })
                .to(ref.current, { x: "-1%", duration: 0.08 })
                .to(ref.current, { x: "1%", duration: 0.08 })
                .to(ref.current, { x: "-1%", duration: 0.08 })
                .to(ref.current, { x: "0", duration: 0.08 });
        }
    );

    function setErrorClass(key: string) {
        const input = document.getElementById(`${key}_field`);
        const label = document.getElementById(`${key}_label`);
        if (label && !label.classList.contains(`${styles.invalid_label}`))
            label.innerHTML = label.innerHTML + " *";
        input?.classList.add(`${styles.invalid_field}`);
        label?.classList.add(`${styles.invalid_label}`);
        shakeAnimation(cardRef);
    }

    function removeWarnings(key: string) {
        const input = document.getElementById(`${key}_field`);
        const label = document.getElementById(`${key}_label`);
        if (label && label.classList.contains(`${styles.invalid_label}`)) {
            label.innerHTML = label.innerHTML.split("*")[0];
            input?.classList.remove(`${styles.invalid_field}`);
            label?.classList.remove(`${styles.invalid_label}`);
        }
    }

    const handleNext = () => {
        if (userExperience.length < 2) {
            setErrorClass("userExperience");
            return;
        }

        clickHandler(cardRef);
    };

    return (
        <Card
            ref={cardRef}
            scale={0.84}
            top={10}
            left={
                <>
                    <section className={styles.left_first}>
                        <p>09</p>
                        <div className={styles.return_button_top}>
                            <ReturnButtons returnHandler={returnHandler} />
                        </div>
                    </section>
                    <section className={styles.left_second}>
                        <h2 className={styles.title}>Sobre tu proyecto</h2>
                    </section>
                    <section className={styles.left_third}>
                        <p className={styles.warning}>
                            Las preguntas marcadas con * son obligatorias.
                        </p>
                    </section>
                </>
            }
            right={
                <>
                    <section
                        style={{ justifyContent: "flex-end" }}
                        className={styles.right_first}
                    >
                        <ReturnButtons returnHandler={returnHandler} />
                    </section>
                    <section className={styles.right_second}>
                        <form>
                            <div className={styles.journey}>
                                <label id="userExperience_label">
                                    ¿Puedes describir la experiencia de usuario
                                    o user journey?
                                </label>
                                <textarea
                                    value={userExperience}
                                    onChange={(e) => {
                                        removeWarnings("userExperience");
                                        setUserExperience(e.target.value);
                                    }}
                                    className={styles.text_area}
                                    placeholder="Text"
                                    name=""
                                    id="userExperience_field"
                                ></textarea>
                            </div>
                        </form>
                    </section>
                    <section
                        style={{ justifyContent: "flex-end" }}
                        className={styles.right_third}
                    >
                        <ContinueButtons
                            clickHandler={() => {
                                handleNext();
                            }}
                        />
                    </section>
                </>
            }
        />
    );
};
