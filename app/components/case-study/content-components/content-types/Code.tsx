import styles from '../../../../css/case-study/content-components.module.css'

type CodeText = {
    type: 'text';
    text: string;
}

type CodeData = {
    type: 'code';
    children: CodeText[];
}

export type CodeProps = { data: CodeData };

const Code = ({ data }: CodeProps): React.JSX.Element =>
(
    <div className={styles.code_block}>
        <pre>
            {data.children.map((content, idx) => (
                <code key={idx}>{content.text}</code>
            ))}
        </pre>
    </div>
);

export default Code;
