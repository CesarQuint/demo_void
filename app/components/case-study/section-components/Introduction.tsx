import { Project } from "../../../Strapi/interfaces/Entities/Project";
import { ContentSectionTitles } from "./ContentMenu";
import styles from "./Introduction.module.css";

type IntroductionProps = {
    data: {
        intro: Project["attributes"]["Introduction"];
        eventDate: Project["attributes"]["EventDate"];
        location: Project["attributes"]["Location"];
    };
};

const dateWithMonthName = (date: Date): string => {
    const MONTHS = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ];

    return `${date.getDate()} de ${MONTHS[date.getMonth() - 1]}, ${date.getFullYear()}`;
};

const Introduction: React.FC<IntroductionProps> = ({ data }) => (
    <section className={styles.intro}>
        <h1 className={styles.title}>
            {ContentSectionTitles.Introduction.title}
        </h1>

        <p>FECHA: {dateWithMonthName(new Date(data.eventDate))}</p>
        <p>UBICACIÓN: {data.location}</p>

        <p className={styles.summary}>{data.intro}</p>
    </section>
);

export default Introduction;
