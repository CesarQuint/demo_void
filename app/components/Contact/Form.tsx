import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/contact/main.module.css";

const Form = () => {
  return (
    <motion.div className={`${styles.section} ${styles.section_3}`}>
      <motion.div>
        <p>¿Tienes una idea?</p>
        <p>Cuéntanos</p>
      </motion.div>
      <motion.div>
        <form>
          <section>
            <label htmlFor="">Nombre</label>
            <input type="text" name="" id="" />
          </section>
          <section>
            <label htmlFor="">Apellido</label>
            <input type="text" name="" id="" />
          </section>
          <section>
            <label htmlFor="">Organizacion</label>
            <input type="text" name="" id="" />
          </section>
          <section>
            <label htmlFor="">Emain</label>
            <input type="text" name="" id="" />
          </section>
          <section>
            <label htmlFor="">Mensaje</label>
            <input type="text" name="" id="" />
          </section>
        </form>
      </motion.div>
      <motion.div>
        <button>ENVIAR</button>
        <button>Arrow</button>
      </motion.div>
    </motion.div>
  );
};

export default Form;
