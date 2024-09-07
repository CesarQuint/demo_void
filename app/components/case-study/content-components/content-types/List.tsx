import React from "react";
import InnerText, { InnerTextData } from "./Text";
import styles from '../../../../css/case-study/content-components.module.css'

type ListData = {
    type: 'list';
    format: 'ordered' | 'unordered';
    children: ListItemData[];
}

type ListItemData = {
    type: 'list-item';
    children: InnerTextData[];
}

type ListItemProps = { data: ListItemData };

export type ListProps = { data: ListData };

const mapListFormat = (data: ListData): React.JSX.Element =>
    data.format === 'ordered'
        ? OrderedList({ children: data.children })
        : UnorderedList({ children: data.children });

const OrderedList = ({ children }: { children: ListItemData[] }): React.JSX.Element =>
(
    <ol className={styles.list} >
        {children.map((i, idx) => <ListItem key={idx} data={i} />)}
    </ol>
);

const UnorderedList = ({ children }: { children: ListItemData[] }): React.JSX.Element =>
(
    <ul className={styles.list} >
        {children.map((i, idx) => <ListItem key={idx} data={i} />)}
    </ul>
);

const ListItem = ({ data }: ListItemProps): React.JSX.Element =>
(
    <li className={styles.list_item}>
        <InnerText children={data.children} />
    </li>
);

const List = ({ data }: ListProps): React.JSX.Element => mapListFormat(data);

export default List;
