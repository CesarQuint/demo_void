import { Project } from "@/app/Strapi/interfaces/Entities/Project";
import { ContentSectionName } from "@/app/Strapi/interfaces/Entities/Project";
import Code, { CodeProps } from "../content-components/content-types/Code";
import Paragraph, { ParagraphProps } from "../content-components/content-types/Paragraph";
import Image, { ImageProps } from "../content-components/content-types/Image";
import Heading, { HeadingProps } from "../content-components/content-types/Heading";
import List, { ListProps } from "../content-components/content-types/List";
import Quote, { QuoteProps } from "../content-components/content-types/Quote";
import { ContentSectionTitles } from "./ContentMenu";
import styles from './ContentSections.module.css';

export type ContentData =
    Array<
        CodeProps['data'] |
        ParagraphProps['data'] |
        ImageProps['data'] |
        HeadingProps['data'] |
        ListProps['data'] |
        QuoteProps['data']
    >;

export type ContentSectionData = Project['attributes'][ContentSectionName];

export type ContentSectionsProps = {
    data: {
        data: ContentData | null;
        name: ContentSectionName;
    }[]
};

const ContentSwitch = (content: ContentData[0]): React.JSX.Element => {
    switch (content.type) {
        case "code":
            return Code({ data: content });
        case "paragraph":
            return Paragraph({ data: content });
        case "heading":
            return Heading({ data: content });
        case "list":
            return List({ data: content });
        case "quote":
            return Quote({ data: content });
        case "image":
            return Image({ data: content });
        default:
            throw new TypeError("Unexpected content type");
    }
};

const ContentSection: React.FC<{ data: ContentData }> = ({ data }) =>
    data.map((content) => ContentSwitch(content));

const Section: React.FC<{ data: ContentSectionsProps['data'][0] }> =
    ({ data: content }) => (
        <section
            id={content.name}
            className={styles.contentSection}
        >
            <div className={styles.innerContent}>
                <h1 className={styles.title}>
                    {ContentSectionTitles[content.name].title}
                </h1>

                {content.data && (
                    <ContentSection data={content.data} />
                )}
            </div>
        </section>
    );

const ContentSections: React.FC<ContentSectionsProps> = ({ data }) =>
    data
        .filter((content) => Boolean(content.data))
        .map((content) => Section({ data: content }));

export default ContentSections;
