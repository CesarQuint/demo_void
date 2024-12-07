import React, { RefObject, useContext } from "react";
import Image from "next/image";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../components/Buttons";
import { Card } from "../CardTemplate";
import arrow from "../../../../public/images/wArrow.svg"; // Adjust the import based on your structure
import { FormContext } from "../Context/ContextForm";

interface CustomCardProps {
    cardRef: RefObject<HTMLDivElement>;
    clickHandler: (ref: RefObject<HTMLDivElement>) => void;
    returnHandler: () => void;
}

export const ComplemetarySystemsCard: React.FC<CustomCardProps> = ({
    cardRef,
    clickHandler,
    returnHandler,
}) => {
    const { complementarySystems, setComplementarySystems } =
        useContext(FormContext);

    return (
        <Card
            ref={cardRef}
            scale={0.82}
            top={10}
            left={
                <>
                    <section className={styles.left_first}>
                        <p>10</p>
                        <div className={styles.return_button_top}>
                            <ReturnButtons returnHandler={returnHandler} />
                        </div>
                    </section>
                    <section className={styles.left_second}>
                        <h2 className={styles.title}>
                            Sistemas complementarios
                        </h2>
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
                            <div
                                style={{
                                    display: "flex",
                                    flexFlow: "column nowrap",
                                    gap: "2vw",
                                    marginBottom: "3vh",
                                }}
                            >
                                ¿Incluimos sistema de audio además de los
                                equipos de proyección?
                                <section className={styles.form_row}>
                                    <div className={styles.input_place}>
                                        <input
                                            type="radio"
                                            name="addAudioSystems"
                                            id="addAudioSystemsYes"
                                            value="yes"
                                            checked={
                                                complementarySystems.addAudioSystems ===
                                                true
                                            }
                                            onChange={() => {
                                                setComplementarySystems(
                                                    (prev) => ({
                                                        ...prev,
                                                        addAudioSystems: true,
                                                    })
                                                );
                                            }}
                                        />
                                        <label htmlFor="addAudioSystemsYes">
                                            Si
                                        </label>
                                    </div>
                                    <div className={styles.input_place}>
                                        <input
                                            type="radio"
                                            name="addAudioSystems"
                                            id="addAudioSystemsNo"
                                            value="no"
                                            checked={
                                                complementarySystems.addAudioSystems ===
                                                false
                                            }
                                            onChange={() => {
                                                setComplementarySystems(
                                                    (prev) => ({
                                                        ...prev,
                                                        addAudioSystems: false,
                                                    })
                                                );
                                            }}
                                        />
                                        <label htmlFor="addAudioSystemsNo">
                                            No
                                        </label>
                                    </div>
                                </section>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexFlow: "column nowrap",
                                    gap: "2vw",
                                }}
                            >
                                <p>
                                    ¿Incluimos un kit de iluminación
                                    complementaria para el evento?
                                </p>
                                <section className={styles.form_row}>
                                    <div className={styles.input_place}>
                                        <input
                                            type="radio"
                                            name="addLightSystems"
                                            id="addLightSystemsYes"
                                            value="yes"
                                            checked={
                                                complementarySystems.addLightSystem ===
                                                true
                                            }
                                            onChange={() => {
                                                setComplementarySystems(
                                                    (prev) => ({
                                                        ...prev,
                                                        addLightSystem: true,
                                                    })
                                                );
                                            }}
                                        />
                                        <label htmlFor="addLightSystemsYes">
                                            Si
                                        </label>
                                    </div>
                                    <div className={styles.input_place}>
                                        <input
                                            type="radio"
                                            name="addLightSystems"
                                            id="addLightSystemsNo"
                                            value="no"
                                            checked={
                                                complementarySystems.addLightSystem ===
                                                false
                                            }
                                            onChange={() => {
                                                setComplementarySystems(
                                                    (prev) => ({
                                                        ...prev,
                                                        addLightSystem: false,
                                                    })
                                                );
                                            }}
                                        />
                                        <label htmlFor="addLightSystemsNo">
                                            No
                                        </label>
                                    </div>
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
