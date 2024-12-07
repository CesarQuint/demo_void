"use client";
import React, { RefObject, useContext } from "react";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../components/Buttons";
import { Card } from "../CardTemplate";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { Value } from "react-calendar/dist/cjs/shared/types";

import dynamic from "next/dynamic";
import { FormContext } from "../Context/ContextForm";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

interface CustomCardProps {
    cardRef: RefObject<HTMLDivElement>;
    clickHandler: (ref: RefObject<HTMLDivElement>) => void;
    returnHandler: () => void;
}

const formatShortWeekday = (locale: string | undefined, date: Date): string => {
    const weekdays = ["D", "L", "M", "M", "J", "V", "S"];
    return weekdays[date.getDay()];
};

export const DatesAvailableCard: React.FC<CustomCardProps> = ({
    cardRef,
    clickHandler,
    returnHandler,
}) => {
    const { selectedDates, setSelectedDates } = useContext(FormContext);

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
        if (selectedDates == null) {
            setErrorClass("startDate");
            setErrorClass("endDate");
            return;
        }

        clickHandler(cardRef);
    };

    const handleDateChange = (value: Value) => {
        removeWarnings("startDate");
        removeWarnings("endDate");
        setSelectedDates(value as Date | [Date, Date]);
    };

    return (
        <Card
            ref={cardRef}
            scale={0.92}
            top={10}
            left={
                <>
                    <section className={styles.left_first}>
                        <p>05</p>
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
                        <div className={styles.calendar_flex}>
                            <section className={styles.dates_flex}>
                                <h4>
                                    Disponibilidad de fechas
                                    <p
                                        style={{
                                            display: "inline",
                                            color: "red",
                                            margin: 0,
                                        }}
                                    >
                                        *
                                    </p>
                                </h4>
                                <div className={styles.input_date_flex}>
                                    <section className={styles.imput_text_date}>
                                        <label htmlFor="" id="startDate_label">
                                            Fecha de Inicio
                                            <p
                                                style={{
                                                    display: "inline",
                                                    color: "red",
                                                    margin: 0,
                                                }}
                                            >
                                                *
                                            </p>
                                        </label>
                                        <input
                                            value={
                                                Array.isArray(selectedDates)
                                                    ? selectedDates[0].toLocaleDateString() // Format the date as desired
                                                    : "--/--/----"
                                            }
                                            readOnly={true}
                                            className={styles.input_date}
                                            type="text"
                                            name=""
                                            id="startDate_field"
                                        />
                                    </section>
                                    <section className={styles.imput_text_date}>
                                        <label htmlFor="" id="endDate_label">
                                            Fecha de Finalizacion
                                            <p
                                                style={{
                                                    display: "inline",
                                                    color: "red",
                                                    margin: 0,
                                                }}
                                            >
                                                *
                                            </p>
                                        </label>
                                        <input
                                            value={
                                                Array.isArray(selectedDates)
                                                    ? selectedDates[1].toLocaleDateString() // Format the date as desired
                                                    : "--/--/----"
                                            }
                                            readOnly={true}
                                            className={styles.input_date}
                                            type="text"
                                            name=""
                                            id="endDate_field"
                                        />
                                    </section>
                                </div>
                            </section>
                            <section className={styles.calendar_wrapper}>
                                <div className={styles.calendar_container}>
                                    <Calendar
                                        className="calender-body"
                                        formatShortWeekday={formatShortWeekday}
                                        selectRange={true}
                                        onChange={(e) => {
                                            handleDateChange(e);
                                        }}
                                        value={selectedDates}
                                    />
                                </div>
                            </section>
                        </div>
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
