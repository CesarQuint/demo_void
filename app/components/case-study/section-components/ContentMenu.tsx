import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Project, ContentSectionName } from '../../../Strapi/interfaces/Entities/Project';
import { HeadingProps } from '../content-components/content-types/Heading';
import { InnerTextData } from '../content-components/content-types/Text';
import { ContentData, ContentSectionData } from './ContentSections';
import styles from './ContentMenu.module.css';
import { ParagraphProps } from '../content-components/content-types/Paragraph';

export type SubIndexData = {
    index: number;
    title: string;
};

type MenuItemData = {
    index: number;
    title: string;
    subIndexes?: SubIndexData[];
};

type MenuProps = { data: Project };

type ContentSectionItems = Record<ContentSectionName | 'gallery', MenuItemData>;

export const ContentSectionTitles: ContentSectionItems = {
    [ContentSectionName.INTRODUCTION]: {
        index: 0,
        title: 'introducción',
    },
    [ContentSectionName.CONCEPTUALIZATION]: {
        index: 1,
        title: 'conceptualización',
    },
    [ContentSectionName.DEVELOPMENT]: {
        index: 2,
        title: 'desarrollo',
    },
    [ContentSectionName.PRODUCTION]: {
        index: 3,
        title: 'producción',
    },
    [ContentSectionName.RESULTS]: {
        index: 4,
        title: 'resultados',
    },
    [ContentSectionName.CREDITS]: {
        index: 5,
        title: 'agradecimientos',
    },
    gallery: {
        index: 5,
        title: 'galería',
    },
}

const paragraphIsNotEmpty = (paragraph: ParagraphProps['data']): boolean =>
    paragraph.children.reduce((prev, curr) =>
        prev || (curr.type === 'text' ? !!curr.text.length : true),
        false
    );

const contentArrayIsNotEmpty = (content: ContentData): boolean =>
    content.reduce((prev, curr) =>
        prev || (curr.type === 'paragraph' ? paragraphIsNotEmpty(curr) : true),
        false
    );

const contentStringIsNotEmpty = (content: string | null): boolean =>
    typeof content === 'string' && !!content.length;

export const sectionHasContent = (project: Project) => (section: ContentSectionName): boolean =>
    Array.isArray(project.attributes[section])
        ? contentArrayIsNotEmpty(project.attributes[section] as ContentData)
        : contentStringIsNotEmpty(project.attributes[section] as string | null);

export const mapToSubIndexData = (section: ContentSectionData): SubIndexData[] => {
    const isSubindexEmpty = typeof section === 'string' || section === null;
    if (isSubindexEmpty) return [];

    const reduceHeadingProps = (
        prev: HeadingProps['data'][],
        curr: HeadingProps['data']
    ): HeadingProps['data'][] => {
        if (prev.length === 0 || curr.level < prev[0].level) {
            return [curr];
        } else if (curr.level === prev[0].level) {
            return [...prev, curr];
        } else {
            return prev;
        }
    };

    const reduceChildrenToString = (
        prev: string,
        curr: InnerTextData,
    ) => prev + mapInnerTextToString(curr);

    const mapInnerTextToString = (innerText: InnerTextData): string =>
        innerText.type === 'link'
            ? innerText.children.reduce(reduceChildrenToString, '')
            : innerText.text;

    const mapToSubindex = (
        heading: HeadingProps['data'],
        idx: number
    ): SubIndexData => ({
        index: idx,
        title: heading.children.reduce(reduceChildrenToString, ''),
    });

    const HEADINGS = section
        .filter((content: ContentData[0]): content is HeadingProps['data'] =>
            content.type === 'heading')
        .reduce(reduceHeadingProps, []).map(mapToSubindex);

    return HEADINGS;
};

export const isInContentSection = (key: string): key is ContentSectionName =>
    Object.values(ContentSectionName).includes(key as ContentSectionName);

const mapToProjectSection = (section: ContentSectionName, data: ContentSectionData): MenuItemData => ({
    index: ContentSectionTitles[section].index,
    title: ContentSectionTitles[section].title,
    subIndexes: mapToSubIndexData(data)
});

const mapToMenuItemData = (project: Project) => (section: ContentSectionName): MenuItemData =>
    mapToProjectSection(section, project.attributes[section]);

const mapProjectDataToMenuItems = (project: Project): MenuItemData[] =>
    Object
        .keys(project.attributes)
        .filter(isInContentSection)
        .filter(sectionHasContent(project))
        .map(mapToMenuItemData(project))
        .sort((a, b) => a.index - b.index);

const findNameFromIndex = (idx: number) => Object.entries(ContentSectionTitles).find(([key, item]) => item.index === idx)?.[0];

const MenuItem: React.FC<{
    idx: number,
    item: MenuItemData,
    activeIndex: number | null
    setActiveIndex: (index: number | null) => void,
}> = ({ idx, item, activeIndex, setActiveIndex }) => (
    <li
        key={idx}
        className={styles.menuItem}
        onMouseEnter={() => setActiveIndex(idx)}
        onMouseLeave={() => setActiveIndex(null)}
    >
        <a href={'#' + findNameFromIndex(idx)}><FiChevronRight style={{ marginRight: '0.5rem' }} />{item.title}</a>
        {item.subIndexes && (
            <ul
                className={`${styles.subMenu} ${activeIndex === idx ? styles.active : ''}`}
            >
                {item.subIndexes.map((subItem, subIndex) => (
                    <li key={subIndex} className={styles.subMenuItem}>
                        <a href={'#'}>{subItem.title}</a>
                    </li>
                ))}
            </ul>
        )}
    </li>
);

const ContentMenu: React.FC<MenuProps> = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const items = mapProjectDataToMenuItems(data);
    items.push(ContentSectionTitles.gallery);

    return (
        <section className={styles.container}>
            <ul className={styles.menu}>
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        idx={index}
                        item={item}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex} />
                ))}
            </ul>
        </section>
    );
};

export default ContentMenu;
