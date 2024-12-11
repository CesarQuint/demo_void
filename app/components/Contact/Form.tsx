import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../css/contact/main.module.css";
import Image from "next/image";
import wArrow from "../../../public/images/arrow.svg";
import { toast } from "react-toastify";

const Form = () => {
    const [name, setName] = useState<string>("");
    const [surName, setSurName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [validForm, setValidForm] = useState<boolean>(true);

    const data = {
        name,
        surName,
        email,
        company,
        message,
    };

    function fielValidator(key: string, value: string) {
        if (value.length <= 1) {
            const input = document.getElementById(`${key}_field`);
            const label = document.getElementById(`${key}_label`);
            if (label && !label.classList.contains(`${styles.invalid_label}`))
                label.innerHTML = label.innerHTML + " *";
            input?.classList.add(`${styles.invalid_field}`);
            label?.classList.add(`${styles.invalid_label}`);
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

    function submitHandler() {
        let result = new Array();

        for (const [key, value] of Object.entries(data)) {
            result = [...result, fielValidator(key, value)];
        }
        if (result.includes(false)) {
            setValidForm(false);
            return;
        }
        setValidForm(true);
        //! send data request

        toast.success("Fomularion enviado!.", {
            position: "top-right",
            theme: "dark",
        });

        setEmail("");
        setName("");
        setSurName("");
        setCompany("");
        setMessage("");
    }

    return (
        <motion.div className={`${styles.section} ${styles.section_3}`}>
            <motion.div className={styles.description}>
                <p className={styles.title}>¿Tienes una idea?</p>
                <p className={styles.text}>Cuéntanos</p>
            </motion.div>
            <motion.div>
                <form className={styles.form}>
                    <div className={styles.names}>
                        <section className={styles.input_w_l_n}>
                            <label
                                className={styles.label}
                                htmlFor="name"
                                id="name_label"
                            >
                                Nombre
                            </label>
                            <input
                                onChange={(e) => {
                                    removeWarnings("name");
                                    setName(e.target.value);
                                }}
                                value={name}
                                name="name"
                                className={styles.input}
                                type="text"
                                id="name_field"
                            />
                        </section>

                        <section className={styles.input_w_l_n}>
                            <label
                                className={styles.label}
                                htmlFor="surName"
                                id="surName_label"
                            >
                                Apellido
                            </label>
                            <input
                                onChange={(e) => {
                                    removeWarnings("surName");
                                    setSurName(e.target.value);
                                }}
                                value={surName}
                                className={styles.input}
                                type="text"
                                name="surName"
                                id="surName_field"
                            />
                        </section>
                    </div>

                    <section className={styles.input_w_l}>
                        <label
                            className={styles.label}
                            htmlFor="company"
                            id="company_label"
                        >
                            Organizacion
                        </label>
                        <input
                            onChange={(e) => {
                                removeWarnings("company");
                                setCompany(e.target.value);
                            }}
                            value={company}
                            className={styles.input}
                            type="text"
                            name="company"
                            id="company_field"
                        />
                    </section>
                    <section className={styles.input_w_l}>
                        <label
                            className={styles.label}
                            htmlFor="email"
                            id="email_label"
                        >
                            Email
                        </label>
                        <input
                            onChange={(e) => {
                                removeWarnings("email");
                                setEmail(e.target.value);
                            }}
                            value={email}
                            className={styles.input}
                            type="email"
                            name="email"
                            id="email_field"
                        />
                    </section>
                    <section className={styles.input_w_l}>
                        <label
                            className={styles.label}
                            htmlFor="message"
                            id="message_label"
                        >
                            Mensaje
                        </label>
                        <textarea
                            className={styles.input}
                            onChange={(e) => {
                                removeWarnings("message");
                                setMessage(e.target.value);
                            }}
                            value={message}
                            id="message_field"
                        ></textarea>
                    </section>
                </form>
            </motion.div>
            {!validForm && (
                <p className={`${styles.invalid_label}`}>
                    Todos los campos son obligatorios
                </p>
            )}

            <motion.div className={styles.buttons_wrapper}>
                <button onClick={submitHandler} className={styles.button_1}>
                    ENVIAR
                </button>
                <button className={styles.button_2} onClick={submitHandler}>
                    <Image
                        className={styles.arrow_button}
                        width={1000}
                        height={1000}
                        src={wArrow}
                        alt="arrow"
                    />
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Form;
