import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/contact/main.module.css";
import Whatsapp from "./Whatsapp";
import Form from "./Form";
import Brief from "./Brief";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
    return (
        <motion.section className={styles.main}>
            <ToastContainer autoClose={3000} draggablePercent={50} />
            <Brief />
            <Form />
        </motion.section>
    );
};

export default Main;
