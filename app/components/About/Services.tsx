"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../css/About/services.module.css";
import Tabs from "./Tabs";
import { about_us_tabs } from "../../constants/tabs_text";
import { Project } from "@/app/Strapi/interfaces/Entities/Project";
import {
    getCategoriesData,
    getProjectsByCategory,
} from "@/app/Strapi/RestAPI/ProjectsProvider";

type Props = {};

const Services = (props: Props) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeCategory, setActiveCategory] = useState<number>(NaN);
    const [categories, setCategories] = useState<
        Project["attributes"]["Category"]["data"][]
    >([]);

    useEffect(() => {
        const fetchCategory = async () => {
            getCategoriesData().then(({ data }) => {
                setCategories(data);
                if (data.length > 0) setActiveCategory(0);
                console.log(data);
            });
        };
        fetchCategory();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            getProjectsByCategory({
                slug: categories[activeCategory]?.attributes?.slug ?? "",
            }).then(({ data }) => (setProjects(data), console.log(data)));
        };
        fetchProjects();
    }, [categories, activeCategory]);

    return (
        <motion.section className={styles.main}>
            <div>
                <h2 className={styles.title}>SERVICIOS</h2>
            </div>

            <Tabs tabs={about_us_tabs} />

            <div className={styles.related_projects}>
                {/* <h2>Proyectos relacionados</h2> */}
                {/* <RelatedProyectsCarrousel data={} /> */}
            </div>
        </motion.section>
    );
};

export default Services;
