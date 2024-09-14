import React from "react";
import InnerText, { InnerTextData } from "./Text";
import styles from './List.module.css';

type ListData = {
    type: 'list';
    format: 'ordered' | 'unordered';
    indentLevel: number;
    children: (ListItemData | ListData)[];
}

type ListItemData = {
    type: 'list-item';
    children: InnerTextData[];
}

type ListItemProps = { data: ListItemData };

export type ListProps = { data: ListData };

const mapToListFormat = (data: ListData): React.JSX.Element =>
    data.format === 'ordered'
        ? OrderedList({ children: data.children })
        : UnorderedList({ children: data.children });

const mapToListChild = (data: ListData | ListItemData): React.JSX.Element =>
    data.type === 'list'
        ? mapToListFormat(data)
        : ListItem({ data });

const OrderedList = ({ children }: { children: ListData['children'] }): React.JSX.Element =>
(
    <ol className={styles.list} >
        {children.map((data) => mapToListChild(data))}
    </ol>
);

const UnorderedList = ({ children }: { children: ListData['children'] }): React.JSX.Element =>
(
    <ul className={styles.list} >
        {children.map((data) => mapToListChild(data))}
    </ul>
);

const ListItem = ({ data }: ListItemProps): React.JSX.Element =>
(
    <li className={styles.listItem}>
        <InnerText children={data.children} />
    </li>
);

const List = ({ data }: ListProps): React.JSX.Element => mapToListFormat(data);

export default List;
