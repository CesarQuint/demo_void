import { useEffect, useState } from "react";
import { Project } from "../../../Strapi/interfaces/Entities/Project";
import { ContentSectionName } from "../../../Strapi/interfaces/Entities/Project";
import Code, { CodeProps } from "../content-components/content-types/Code";
import Paragraph, {
    ParagraphProps,
} from "../content-components/content-types/Paragraph";
import Image, { ImageProps } from "../content-components/content-types/Image";
import Heading, {
    HeadingProps,
} from "../content-components/content-types/Heading";
import List, { ListProps } from "../content-components/content-types/List";
import Quote, { QuoteProps } from "../content-components/content-types/Quote";
import {
    ContentSectionTitles,
    mapToSubIndexData,
    SubIndexData,
} from "./ContentMenu";
import styles from "./ContentSections.module.css";

export type ContentData = Array<
    | CodeProps["data"]
    | ParagraphProps["data"]
    | ImageProps["data"]
    | HeadingProps["data"]
    | ListProps["data"]
    | QuoteProps["data"]
>;

export type ContentSectionData = Project["attributes"][ContentSectionName];

export type ContentSectionsProps = {
    data: {
        data: ContentData | null;
        name: ContentSectionName;
    }[];
};

type SectionProps = { data: ContentSectionsProps["data"][0] };

const ContentSwitch = (
    content: ContentData[0],
    idx: number,
): React.JSX.Element => {
    switch (content.type) {
        case "code":
            return <Code data={content} key={idx} />;
        case "paragraph":
            return <Paragraph data={content} key={idx} />;
        case "heading":
            return <Heading data={content} key={idx} />;
        case "list":
            return <List data={content} key={idx} />;
        case "quote":
            return <Quote data={content} key={idx} />;
        case "image":
            return <Image data={content} key={idx} />;
        default:
            throw new TypeError("Unexpected content type");
    }
};

const ContentSection: React.FC<{ data: ContentData }> = ({ data }) =>
    data.map((content, idx) => ContentSwitch(content, idx));

const Section: React.FC<SectionProps> = ({ data: content }) => {
    const [activeSection, setActiveSection] = useState(0);
    const contentChunks: ContentData[] = chunkArrayEveryHeading(
        content.data ?? [],
    );
    const headings: SubIndexData[] = contentChunks
        .map((chunk): ContentData[0] => chunk[0])
        .map((content) => mapToSubIndexData([content]))
        .map(([subindex], idx) => ({
            index: idx,
            title: subindex?.title ?? "introducción",
        }));

    return (
        <section id={content.name} className={styles.contentSection}>
            <h1 className={styles.title}>
                {ContentSectionTitles[content.name].title}
            </h1>

            {!!headings.length && (
                <div className={styles.innerContent}>
                    <div className={styles.sideMenu}>
                        <ul className={styles.menuList}>
                            {headings.map((heading, idx) => (
                                <li
                                    key={idx}
                                    className={styles.sideMenuItem}
                                    onClick={() =>
                                        setActiveSection(heading.index)
                                    }
                                >
                                    <span>{heading.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.content}>
                        {content.data && (
                            <ContentSection
                                data={contentChunks[activeSection]}
                            />
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

const ContentSections: React.FC<ContentSectionsProps> = ({ data }) =>
    data
        .filter((content) => Boolean(content.data))
        .map((content) => Section({ data: content }));

const chunkArrayEveryHeading = (content: ContentData): ContentData[] =>
    content.reduce(
        (acc: ContentData[], curr: ContentData[0]) => (
            curr.type === "heading"
                ? acc.push([curr])
                : acc[acc.length - 1].push(curr),
            acc
        ),
        [[]],
    );

export default ContentSections;
