import React from "react";
import InnerText, { InnerTextData } from "./Text";
import styles from '../../../../css/case-study/content-components.module.css'

type HeadingData = {
    level: number;
    type: 'heading';
    children: InnerTextData[];
}

export type HeadingProps = { data: HeadingData };

const throwInvalidHeadingLevelException = (level: number) => {
    throw new Error(`Invalid heading level: ${level}`);
}

const validateHeadingLevel = (level: number): boolean =>
    (level > 1 && level < 6) || throwInvalidHeadingLevelException(level);

const HeadingElement = (data: HeadingData): React.ReactElement => React.createElement(
    'h' + data.level,
    { className: styles.heading },
    <InnerText children={data.children} />
);

const Heading = ({ data }: HeadingProps) => validateHeadingLevel(data.level) && HeadingElement(data);

export default Heading;
