import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/contact/main.module.css";

const Form = () => {
  return (
    <motion.div className={`${styles.section} ${styles.section_3}`}>
      <motion.div className={styles.description}>
        <p className={styles.title}>¿Tienes una idea?</p>
        <p className={styles.text}>Cuéntanos</p>
      </motion.div>
      <motion.div>
        <form className={styles.form}>
          <div className={styles.names}>
            <section className={styles.input_w_l}>
              <label className={styles.label} htmlFor="">
                Nombre
              </label>
              <input className={styles.input} type="text" name="" id="" />
            </section>
            <section className={styles.input_w_l}>
              <label className={styles.label} htmlFor="">
                Apellido
              </label>
              <input className={styles.input} type="text" name="" id="" />
            </section>
          </div>

          <section className={styles.input_w_l}>
            <label className={styles.label} htmlFor="">
              Organizacion
            </label>
            <input className={styles.input} type="text" name="" id="" />
          </section>
          <section className={styles.input_w_l}>
            <label className={styles.label} htmlFor="">
              Emain
            </label>
            <input className={styles.input} type="text" name="" id="" />
          </section>
          <section className={styles.input_w_l}>
            <label className={styles.label} htmlFor="">
              Mensaje
            </label>
            <textarea className={styles.input}></textarea>
          </section>
        </form>
      </motion.div>
      <motion.div className={styles.buttons_wrapper}>
        <button className={styles.button_1}>ENVIAR</button>
        <button className={styles.button_2}>-</button>
      </motion.div>
    </motion.div>
  );
};

export default Form;
