import React, { RefObject } from "react";
import Image from "next/image";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../FormCards";
import { Card } from "../CardTemplate";
import arrow from "../../../../public/images/wArrow.svg"; // Adjust the import based on your structure

interface CustomCardProps {
    cardRef: RefObject<HTMLDivElement>;
    clickHandler: (ref: RefObject<HTMLDivElement>) => void;
    returnHandler: () => void;
}

export const ContactCard: React.FC<CustomCardProps> = ({
    cardRef,
    clickHandler,
    returnHandler,
}) => {
    return (
        <Card
            ref={cardRef}
            scale={0.98}
            top={6}
            left={
                <>
                    <section className={styles.left_first}>
                        <p>02</p>
                        <div className={styles.return_button_top}>
                            <ReturnButtons returnHandler={returnHandler} />
                        </div>
                    </section>
                    <section className={styles.left_second}>
                        <h2 className={styles.title}>Datos de Contacto</h2>
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
                        <form className={styles.contact}>
                            <div className={styles.contact_column}>
                                <section className={styles.imput_text}>
                                    <label htmlFor="">
                                        Nombre
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
                                        className={styles.input_white}
                                        type="text"
                                        name=""
                                        id=""
                                    />
                                </section>
                                <section className={styles.imput_text}>
                                    <label htmlFor="">
                                        Teléfono
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
                                        className={styles.input_white}
                                        type="text"
                                        name=""
                                        id=""
                                    />
                                </section>
                            </div>
                            <div className={styles.contact_column}>
                                <section className={styles.imput_text}>
                                    <label htmlFor="">
                                        Organización
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
                                        className={styles.input_white}
                                        type="text"
                                        name=""
                                        id=""
                                    />
                                </section>
                                <section className={styles.imput_text}>
                                    <label htmlFor="">
                                        Email
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
                                        className={styles.input_white}
                                        type="text"
                                        name=""
                                        id=""
                                    />
                                </section>
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
