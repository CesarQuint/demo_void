import React from "react";
import styles from './Text.module.css';

type StylingTypes = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code';

type TextStyling = { [key in StylingTypes]?: boolean; };

type TextData = {
    type: 'text';
    text: string;
} & TextStyling;

type LinkData = {
    type: 'link';
    url: string;
    children: [TextData];
}

export type InnerTextData = TextData | LinkData;

type TextProps = { data: TextData };

type LinkProps = { data: LinkData };

type InnerTextProps = { children: InnerTextData[] };

const mapToTextStyleClasses = (text: TextData): string =>
    [
        styles.innertext,
        text.code && styles.code,
        text.bold && styles.bold,
        text.italic && styles.italic,
        text.underline && styles.underline,
        text.strikethrough && styles.strikethrough,
    ].filter(Boolean).join(' ');

const mapToTextOrLink = (data: InnerTextData) =>
    data.type === 'link'
        ? <Link data={data} />
        : <Text data={data} />;

const Link = ({ data }: LinkProps): React.JSX.Element =>
(
    <a href={data.url} className={styles.link}>
        {data.children.map((i, idx) => <Text key={idx} data={i} />)}
    </a>
);

const Text = ({ data }: TextProps): React.JSX.Element =>
(
    <span className={mapToTextStyleClasses(data)}>
        {data.text}
    </span>
);

const InnerText = ({ children }: InnerTextProps): React.JSX.Element =>
(<>
    {children.map((i) => mapToTextOrLink(i))}
</>);

export default InnerText;
