import React from "react";
import { motion } from "framer-motion";
import styles from "../../css/About/services.module.css";
import RelatedProyectsCarrousel from "./RelatedProyectsCarrousel";
import Tabs from "./Tabs";
import { about_us_tabs } from "@/app/constants/tabs_text";

type Props = {};

const Services = (props: Props) => {
    return (
        <motion.section className={styles.main}>
            <div>
                <h2 className={styles.title}>SERVICIOS</h2>
            </div>

            <Tabs tabs={about_us_tabs} />

            <div className={styles.related_projects}>
                <h2>Proyectos relacionados</h2>
                {/* <RelatedProyectsCarrousel data={} /> */}
            </div>
        </motion.section>
    );
};

export default Services;
