import React, { RefObject, useState } from "react";
import Image from "next/image";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../FormCards";
import { Card } from "../CardTemplate";
import TimePicker from "react-time-picker";
import "react-clock/dist/Clock.css";

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
    const [startDate, setStartDate] = useState("08:00");
    const [endDate, setEndDate] = useState("16:00");

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
                        <p>
                            Direccion del Evento
                            <span
                                style={{
                                    display: "inline",
                                    color: "red",
                                    margin: 0,
                                }}
                            >
                                *
                            </span>
                        </p>
                        <form className={styles.input_form}>
                            <div className={styles.input_place}>
                                <input
                                    className={styles.input_white}
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
                                clickHandler(cardRef);
                            }}
                        />
                    </section>
                </>
            }
        />
    );
};
