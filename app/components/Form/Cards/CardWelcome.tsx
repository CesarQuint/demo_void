import React, { RefObject } from "react";
import Image from "next/image";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../components/Buttons";
import { Card } from "../CardTemplate";
import arrow from "../../../../public/images/wArrow.svg"; // Adjust the import based on your structure

interface CustomCardProps {
    cardRef: RefObject<HTMLDivElement>;
    clickHandler: (ref: RefObject<HTMLDivElement>) => void;
    returnHandler: () => void;
}

export const WelcomeCard: React.FC<CustomCardProps> = ({
    cardRef,
    clickHandler,
    returnHandler,
}) => {
    return (
        <Card
            justify="center"
            ref={cardRef}
            scale={1}
            top={2}
            left={
                <>
                    <section className={styles.left_first}></section>
                    <section className={styles.left_second}>
                        <h2 className={styles.title}>
                            ¡Hagamos una realidad distinta!
                        </h2>
                    </section>
                    <section className={styles.left_third}></section>
                </>
            }
            right={
                <>
                    <section className={styles.right_first}>
                        <button className={styles.white_button}>
                            <Image
                                style={{
                                    width: "2vw",
                                    height: "2vh",
                                    backgroundColor: "#ededed",
                                    transform: "rotate(180deg)",
                                }}
                                width={1000}
                                height={1000}
                                src={arrow}
                                alt="arrow"
                            />
                        </button>
                        <button
                            className={styles.white_button}
                            onClick={returnHandler}
                        >
                            REGRESAR
                        </button>
                    </section>
                    <section className={styles.right_second}>
                        <p>
                            Te invitamos a responder a nuestro breve
                            cuestionario. Con tus respuestas, podremos ofrecerte
                            una cotización rápida y precisa.
                        </p>
                        <p>
                            Nos pondremos en contacto para afinar algunos
                            detalles si es necesario.
                        </p>
                        <p>¡Gracias por tu colaboración!</p>
                    </section>
                    <section className={styles.right_third}>
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
