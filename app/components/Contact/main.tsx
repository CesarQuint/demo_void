import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/contact/main.module.css";
import Whatsapp from "./Whatsapp";
import Form from "./Form";
import Brief from "./Brief";

const Main = () => {
  return (
    <motion.section className={styles.main}>
      <Whatsapp />
      <Brief />
      <Form />
    </motion.section>
  );
};

export default Main;
