import React, { RefObject, useContext } from "react";
import Image from "next/image";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../components/Buttons";
import { Card } from "../CardTemplate";
import arrow from "../../../../public/images/wArrow.svg"; // Adjust the import based on your structure
import { FormContext, LookingForProjectOptions } from "../Context/ContextForm";

interface CustomCardProps {
    cardRef: RefObject<HTMLDivElement>;
    clickHandler: (ref: RefObject<HTMLDivElement>) => void;
    returnHandler: () => void;
}

export const LookingForProjectCard: React.FC<CustomCardProps> = ({
    cardRef,
    clickHandler,
    returnHandler,
}) => {
    const { lookingForProjectData, setLookingForProjectData } =
        useContext(FormContext);

    return (
        <Card
            ref={cardRef}
            scale={0.88}
            top={10}
            left={
                <>
                    <section className={styles.left_first}>
                        <p>07</p>
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
                        <p>
                            ¿Qué tipo de proyecto buscas?
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
                        <div
                            style={{
                                display: "flex",
                                flexFlow: "row nowrap",
                                gap: "2vw",
                            }}
                        >
                            <section className={styles.project_column}>
                                <div className={styles.input_place}>
                                    <input
                                        type="radio"
                                        name="area"
                                        id="inside"
                                        value="inside"
                                        checked={
                                            lookingForProjectData.option ==
                                            LookingForProjectOptions.FACADE_MAPPING
                                        }
                                        onChange={(e) =>
                                            setLookingForProjectData(
                                                (prev) => ({
                                                    ...prev,
                                                    option: LookingForProjectOptions.FACADE_MAPPING,
                                                })
                                            )
                                        }
                                    />
                                    <label htmlFor="">
                                        Mapping sobre fachada
                                    </label>
                                </div>
                                <div className={styles.input_place}>
                                    <input
                                        type="radio"
                                        name="area"
                                        id="outside"
                                        value="outside"
                                        checked={
                                            lookingForProjectData.option ==
                                            LookingForProjectOptions.IMMERSIVE_EXPERIENCE
                                        }
                                        onChange={(e) =>
                                            setLookingForProjectData(
                                                (prev) => ({
                                                    ...prev,
                                                    option: LookingForProjectOptions.IMMERSIVE_EXPERIENCE,
                                                })
                                            )
                                        }
                                    />
                                    <label htmlFor="">
                                        Experiencia inmersiva
                                    </label>
                                </div>
                                <div className={styles.input_place}>
                                    <input
                                        type="radio"
                                        name="area"
                                        id="outside"
                                        value="outside"
                                        checked={
                                            lookingForProjectData.option ==
                                            LookingForProjectOptions.BRAND_ACTIVATION
                                        }
                                        onChange={(e) =>
                                            setLookingForProjectData(
                                                (prev) => ({
                                                    ...prev,
                                                    option: LookingForProjectOptions.BRAND_ACTIVATION,
                                                })
                                            )
                                        }
                                    />
                                    <label htmlFor="">
                                        Activación de marca
                                    </label>
                                </div>
                                <div className={styles.input_place}>
                                    <input
                                        type="radio"
                                        name="area"
                                        id="outside"
                                        value="outside"
                                        checked={
                                            lookingForProjectData.option ==
                                            LookingForProjectOptions.OTHER
                                        }
                                        onChange={(e) =>
                                            setLookingForProjectData(
                                                (prev) => ({
                                                    ...prev,
                                                    option: LookingForProjectOptions.OTHER,
                                                })
                                            )
                                        }
                                    />
                                    <label htmlFor="">Otro</label>
                                </div>
                                {lookingForProjectData.option ==
                                    LookingForProjectOptions.OTHER && (
                                    <input
                                        type="text"
                                        className={styles.input_white}
                                        placeholder="...."
                                        onChange={(e) => {
                                            setLookingForProjectData(
                                                (prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                })
                                            );
                                        }}
                                    ></input>
                                )}
                            </section>
                            <section className={styles.project_column}>
                                <div className={styles.input_place}>
                                    <input
                                        type="radio"
                                        name="area"
                                        id="inside"
                                        value="inside"
                                        checked={
                                            lookingForProjectData.option ==
                                            LookingForProjectOptions.LIVE_SHOW_MAPPING
                                        }
                                        onChange={(e) =>
                                            setLookingForProjectData(
                                                (prev) => ({
                                                    ...prev,
                                                    option: LookingForProjectOptions.LIVE_SHOW_MAPPING,
                                                })
                                            )
                                        }
                                    />
                                    <label htmlFor="">
                                        Mapping para show en vivo
                                    </label>
                                </div>
                                <div className={styles.input_place}>
                                    <input
                                        type="radio"
                                        name="area"
                                        id="outside"
                                        value="outside"
                                        checked={
                                            lookingForProjectData.option ==
                                            LookingForProjectOptions.MUSEUM_INSTALLATION
                                        }
                                        onChange={(e) =>
                                            setLookingForProjectData(
                                                (prev) => ({
                                                    ...prev,
                                                    option: LookingForProjectOptions.MUSEUM_INSTALLATION,
                                                })
                                            )
                                        }
                                    />
                                    <label htmlFor="">
                                        Instalación para museo
                                    </label>
                                </div>
                                <div className={styles.input_place}>
                                    <input
                                        type="radio"
                                        name="area"
                                        id="outside"
                                        value="outside"
                                        checked={
                                            lookingForProjectData.option ==
                                            LookingForProjectOptions.CUSTOM_EXPERIENCE
                                        }
                                        onChange={(e) =>
                                            setLookingForProjectData(
                                                (prev) => ({
                                                    ...prev,
                                                    option: LookingForProjectOptions.CUSTOM_EXPERIENCE,
                                                })
                                            )
                                        }
                                    />
                                    <label htmlFor="">
                                        Experiencia personalizada
                                    </label>
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
                                clickHandler(cardRef);
                            }}
                        />
                    </section>
                </>
            }
        />
    );
};
