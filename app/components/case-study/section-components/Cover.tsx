import styles from "./Cover.module.css";
import { Project } from "../../../Strapi/interfaces/Entities/Project";
import TypedLink from "../../TypedLink/TypedLink";

type CoverProps = {
    data: {
        image: Project["attributes"]["Cover"]["data"];
        title: Project["attributes"]["Title"];
        subtitle: Project["attributes"]["Subtitle"];
        category: Project["attributes"]["Category"];
        asFullCaseStudy: Project["attributes"]["AsFullCaseStudy"];
    };
};

const Cover: React.FC<CoverProps> = ({ data }) => (
    <section
        style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${
                process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL +
                data.image.attributes.formats.large.url
            }), linear-gradient(to top, rgba(0, 0, 0, 35%), rgba(0, 0, 0, 0))`,
            backgroundBlendMode: "multiply",
        }}
        className={styles.cover}
    >
        <div className={styles.title}>
            <h1>{data.title}</h1>

            <div className={styles.tags}>
                <h2>{data.subtitle}</h2>

                <div className={styles.tagsWrapper}>
                    <TypedLink
                        href={
                            "/projectos/" + data.category.data.attributes.slug
                        }
                    >
                        <div className={styles.tag}>
                            {data.category.data.attributes.Name}
                        </div>
                    </TypedLink>

                    {data.asFullCaseStudy && (
                        <div className={styles.tag + " " + styles.caseStudyTag}>
                            {"caso de estudio".toUpperCase()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
);

export default Cover;
