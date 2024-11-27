import React, { RefObject, useContext, useState } from "react";
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

// Custom time picker to handle "MM:SS"
const CustomTimePicker: React.FC<{
    value: string;
    onChange: (value: string) => void;
}> = ({ value, onChange }) => {
    const [minutes, setMinutes] = useState(value.split(":")[0]);
    const [seconds, setSeconds] = useState(value.split(":")[1]);

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newMinutes = e.target.value;
        if (parseInt(newMinutes) > 59) newMinutes = "59";
        setMinutes(newMinutes);
        onChange(`${newMinutes}:${seconds}`);
    };

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newSeconds = e.target.value;
        if (parseInt(newSeconds) > 59) newSeconds = "59";
        setSeconds(newSeconds);
        onChange(`${minutes}:${newSeconds}`);
    };

    return (
        <div className={styles.time_picker}>
            <input
                type="number"
                value={minutes}
                onChange={handleMinutesChange}
                min="0"
                max="59"
                className={styles.time_input}
                aria-label="Minutes"
            />
            <span>:</span>
            <input
                type="number"
                value={seconds}
                onChange={handleSecondsChange}
                min="0"
                max="59"
                className={styles.time_input}
                aria-label="Seconds"
            />
        </div>
    );
};

export const EventDurationCard: React.FC<CustomCardProps> = ({
    cardRef,
    clickHandler,
    returnHandler,
}) => {
    const { duration, setDuration } = useContext(FormContext);

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
        if (duration == "00:00") {
            setErrorClass("duration");
            return;
        }

        clickHandler(cardRef);
    };

    return (
        <Card
            ref={cardRef}
            scale={0.86}
            top={10}
            left={
                <>
                    <section className={styles.left_first}>
                        <p>08</p>
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
                        <h1 id="duration_label">Duración del Contenido</h1>
                        <section className="duration" id="duration_field">
                            <CustomTimePicker
                                value={duration}
                                onChange={(value) => {
                                    removeWarnings("duration");
                                    setDuration(value);
                                }}
                            />
                        </section>
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
