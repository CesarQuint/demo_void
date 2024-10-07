import InnerText, { InnerTextData } from "./Text";
import styles from "./Quote.module.css";

type QuoteData = {
    type: "quote";
    children: InnerTextData[];
};

export type QuoteProps = { data: QuoteData };

const Quote = ({ data }: QuoteProps): React.JSX.Element => (
    <blockquote className={styles.quote}>
        <InnerText data={data.children} />
    </blockquote>
);

export default Quote;
