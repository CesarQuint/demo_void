import styles from "./Code.module.css";

type CodeText = {
    type: "text";
    text: string;
};

type CodeData = {
    type: "code";
    children: CodeText[];
};

export type CodeProps = { data: CodeData };

const Code = ({ data }: CodeProps): React.JSX.Element => (
    <div className={styles.codeblock}>
        <pre className={styles.codeblockPre}>
            {data.children.map((content, idx) => (
                <code key={idx} className={styles.codeblockCode}>
                    {content.text}
                </code>
            ))}
        </pre>
    </div>
);

export default Code;
