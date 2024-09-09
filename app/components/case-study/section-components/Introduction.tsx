import { Project } from "@/app/Strapi/interfaces/Entities/Project";
import Heading from "../content-components/content-types/Heading";
import Paragraph from "../content-components/content-types/Paragraph";
import { ContentSectionTitles } from "./ContentMenu";
import styles from './Introduction.module.css'

type IntroductionProps = {
    data: {
        intro: Project['attributes']['Introduction'],
        eventDate: Project['attributes']['EventDate'],
        location: Project['attributes']['Location'],
    }
};

const dateWithMonthName = (date: Date): string => {
    const MONTHS = [
        "enero", "febrero", "marzo",
        "abril", "mayo", "junio",
        "julio", "agosto", "septiembre",
        "octubre", "noviembre", "diciembre"
    ];

    return `${date.getDate()} de ${MONTHS[date.getMonth() - 1]}, ${date.getFullYear()}`;
}

const Introduction: React.FC<IntroductionProps> = ({ data }) =>
(
    <section className={styles.intro}>
        <Heading
            data={{
                level: 1,
                type: 'heading',
                children: [{
                    type: "text",
                    text: ContentSectionTitles.Introduction.title.toUpperCase()
                }]
            }} />

        <p className={styles.date}>
            FECHA: {dateWithMonthName(new Date(data.eventDate))}
        </p>

        <p>UBICACIÓN: {data.location}</p>

        <div className={styles.introDescription}>
            <Paragraph
                data={{
                    type: 'paragraph',
                    children: [{ type: 'text', text: data.intro }]
                }} />
        </div>
    </section>
);

export default Introduction;
