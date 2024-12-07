import React, { RefObject, useContext, useState } from "react";
import Image from "next/image";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../components/Buttons";
import { Card } from "../CardTemplate";
import "react-clock/dist/Clock.css";
import { FormContext } from "../Context/ContextForm";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface CustomCardProps {
    cardRef: RefObject<HTMLDivElement>;
    clickHandler: (ref: RefObject<HTMLDivElement>) => void;
    returnHandler: () => void;
}

export const LocationCard: React.FC<CustomCardProps> = ({
    cardRef,
    clickHandler,
    returnHandler,
}) => {
    const { direction, setDirection } = useContext(FormContext);

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
        if (direction.length < 2) {
            setErrorClass("direction");
            return;
        }

        clickHandler(cardRef);
    };

    return (
        <Card
            ref={cardRef}
            scale={0.94}
            top={10}
            left={
                <>
                    <section className={styles.left_first}>
                        <p>04</p>
                        <div className={styles.return_button_top}>
                            <ReturnButtons returnHandler={returnHandler} />
                        </div>
                    </section>
                    <section className={styles.left_second}>
                        <h2 className={styles.title}>Información del evento</h2>
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
                        <p id="direction_label">Direccion del Evento</p>
                        <form className={styles.input_form}>
                            <div className={styles.input_place_direction}>
                                <input
                                    id="direction_field"
                                    value={direction}
                                    onChange={(e) => {
                                        removeWarnings("direction");
                                        setDirection(e.target.value);
                                    }}
                                    className={styles.input_white_direction}
                                    type="text"
                                />
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
