import React, { RefObject, useContext } from "react";

import styles from "../../../css/Form/form.module.css";
import { ContinueButtons, ReturnButtons } from "../components/Buttons";
import { Card } from "../CardTemplate";
import { FormContext, EventLocation } from "../Context/ContextForm";

interface CustomCardProps {
    cardRef: RefObject<HTMLDivElement>;
    clickHandler: (ref: RefObject<HTMLDivElement>) => void;
    returnHandler: () => void;
}

export const PlaceTypeCard: React.FC<CustomCardProps> = ({
    cardRef,
    clickHandler,
    returnHandler,
}) => {
    const { eventLocation, setEventLocation } = useContext(FormContext);

    return (
        <Card
            ref={cardRef}
            scale={0.96}
            top={10}
            left={
                <>
                    <section className={styles.left_first}>
                        <p>03</p>
                        <div className={styles.return_button_top}>
                            <ReturnButtons returnHandler={returnHandler} />
                        </div>
                    </section>
                    <section className={styles.left_second}>
                        <h2 className={styles.title}>Tipo de ubicación</h2>
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
                            ¿Tu evento es en interior o exterior?
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
                                <label htmlFor="">Interior</label>
                                <input
                                    type="radio"
                                    name="area"
                                    id="inside"
                                    value="INSIDE"
                                    checked={eventLocation === "INSIDE"}
                                    onChange={(e) =>
                                        setEventLocation(EventLocation.INSIDE)
                                    }
                                />
                            </div>
                            <div className={styles.input_place}>
                                <label htmlFor="">Exterior</label>
                                <input
                                    type="radio"
                                    name="area"
                                    id="outside"
                                    value="OUTSIDE"
                                    checked={eventLocation === "OUTSIDE"}
                                    onChange={(e) =>
                                        setEventLocation(EventLocation.OUTSIDE)
                                    }
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
