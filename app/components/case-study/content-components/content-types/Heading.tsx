import React from "react";
import InnerText, { InnerTextData } from "./Text";
import styles from './Heading.module.css';

type HeadingData = {
    level: number;
    type: 'heading';
    children: InnerTextData[];
}

export type HeadingProps = { data: HeadingData };

const throwInvalidHeadingLevelException = (level: number) => {
    throw new Error(`Invalid heading level: ${level}`);
}

const validateHeadingLevel = (level: number): string =>
    (level > 0 && level < 6) ? String(level) : throwInvalidHeadingLevelException(level);

const Heading = ({ data }: HeadingProps): React.JSX.Element => React.createElement(
    'h' + validateHeadingLevel(data.level),
    { className: styles.heading },
    <InnerText children={data.children} />
);

export default Heading;
