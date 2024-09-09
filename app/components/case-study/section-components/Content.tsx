import { Project } from "@/app/Strapi/interfaces/Entities/Project";
import { CodeProps } from "../content-components/content-types/Code";
import { ParagraphProps } from "../content-components/content-types/Paragraph";
import { ImageProps } from "../content-components/content-types/Image";
import { HeadingProps } from "../content-components/content-types/Heading";
import { ListProps } from "../content-components/content-types/List";
import { ContentSection } from "@/app/Strapi/interfaces/Entities/Project";
import styles from '../../../css/case-study/section-components.module.css'

export type ContentData =
    Array<
        CodeProps['data'] |
        ParagraphProps['data'] |
        ImageProps['data'] |
        HeadingProps['data'] |
        ListProps['data']
    >;

export type ContentSectionData = Project['attributes'][ContentSection];

export type ContentProps = { data: ContentData };

const Content = ({ data }: ContentProps): React.JSX.Element =>
(
    <section className={styles.content}>
        {}
    </section>
);

export default Content;
