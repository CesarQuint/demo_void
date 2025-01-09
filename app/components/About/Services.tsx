"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../css/About/services.module.css";
import { SwiperCategoryTabs } from "./SwiperCategoryTabs";
import { Project } from "@/app/Strapi/interfaces/Entities/Project";
import { Category } from "@/app/Strapi/interfaces/Entities/Category";
import RelatedProjectsCarousel from "./RelatedProjectsCarousel";

type ServicesProps = {
    projects: Project[];
    categories: Category[];
};

const Services = (props: ServicesProps) => {
    const [activeCategory, setActiveCategory] = useState<number>(0);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const matchProjectCategory = (project: Project) =>
            project.attributes.Category.data.id ===
            props.categories[activeCategory].id;

        const filterProjects = () =>
            props.projects.filter((project) => matchProjectCategory(project));

        setProjects(filterProjects());
    }, [props.projects, props.categories, activeCategory]);

    return (
        <motion.section>
            <h2 className={styles.title}>Servicios</h2>

            {!!props.categories.length && (
                <>
                    <SwiperCategoryTabs
                        categories={props.categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                    <RelatedProjectsCarousel
                        titleClassName={styles.relatedProjectsTitle}
                        className={styles.related_projects}
                        data={projects}
                    />
                </>
            )}
        </motion.section>
    );
};

export default Services;
