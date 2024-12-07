import React, { RefObject, useContext } from "react";
import styles from "../../../css/Form/form.module.css";
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

export const ContactCard: React.FC<CustomCardProps> = ({
    cardRef,
    clickHandler,
    returnHandler,
}) => {
    const { contactData, setContactData } = useContext(FormContext);

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

    function fielValidator(key: string, value: string) {
        if (value.length <= 1) {
            const input = document.getElementById(`${key}_field`);
            const label = document.getElementById(`${key}_label`);
            input?.classList.add(`${styles.invalid_field}`);
            label?.classList.add(`${styles.invalid_label}`);
            shakeAnimation(cardRef);
            return false;
        }
        return true;
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
        let result = new Array();

        for (const [key, value] of Object.entries(contactData)) {
            result = [...result, fielValidator(key, value)];
        }
        if (result.includes(false)) {
            return;
        }

        clickHandler(cardRef);
    };

    const changeInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) => {
        removeWarnings(key);
        setContactData((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

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
                                    <label htmlFor="" id="name_label">
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
                                        value={contactData.name}
                                        onChange={(e) => {
                                            changeInput(e, "name");
                                        }}
                                        className={styles.input_white}
                                        type="text"
                                        name=""
                                        id="name_field"
                                    />
                                </section>
                                <section className={styles.imput_text}>
                                    <label htmlFor="" id="phoneNumber_label">
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
                                        value={contactData.phoneNumber}
                                        onChange={(e) => {
                                            changeInput(e, "phoneNumber");
                                        }}
                                        className={styles.input_white}
                                        type="text"
                                        name=""
                                        id="phoneNumber_field"
                                    />
                                </section>
                            </div>
                            <div className={styles.contact_column}>
                                <section className={styles.imput_text}>
                                    <label htmlFor="" id="company_label">
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
                                        value={contactData.company}
                                        onChange={(e) => {
                                            changeInput(e, "company");
                                        }}
                                        className={styles.input_white}
                                        type="text"
                                        name=""
                                        id="company_field"
                                    />
                                </section>
                                <section className={styles.imput_text}>
                                    <label htmlFor="" id="email_label">
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
                                        value={contactData.email}
                                        onChange={(e) => {
                                            changeInput(e, "email");
                                        }}
                                        className={styles.input_white}
                                        type="email"
                                        name=""
                                        id="email_field"
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
                                handleNext();
                            }}
                        />
                    </section>
                </>
            }
        />
    );
};
