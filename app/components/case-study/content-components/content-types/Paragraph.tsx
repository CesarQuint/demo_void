import React from "react";
import InnerText, { InnerTextData } from "./Text";
import styles from '../../../../css/case-study/content-components.module.css'

type ParagraphData = {
    type: 'paragraph',
    children: InnerTextData[]
}

export type ParagraphProps = { data: ParagraphData };

const Paragraph = ({ data }: ParagraphProps): React.JSX.Element =>
(
    <p className={styles.paragraph}>
        <InnerText children={data.children} />
    </p>
);

export default Paragraph;
