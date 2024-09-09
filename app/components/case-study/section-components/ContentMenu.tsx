import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Project, ContentSection } from '@/app/Strapi/interfaces/Entities/Project';
import { HeadingProps } from '../content-components/content-types/Heading';
import { InnerTextData } from '../content-components/content-types/Text';
import { ContentSectionData } from './Content';
import styles from './ContentMenu.module.css';

type SubIndexData = {
    index: number;
    title: string;
};

type MenuItemData = {
    index: number;
    title: string;
    subIndexes?: SubIndexData[];
};

type MenuProps = { data: Project };

type ContentSectionItems = Record<ContentSection | 'gallery', MenuItemData>;

export const ContentSectionTitles: ContentSectionItems = {
    [ContentSection.INTRODUCTION]: {
        index: 0,
        title: 'introducción',
    },
    [ContentSection.CONCEPTUALIZATION]: {
        index: 1,
        title: 'conceptualización',
    },
    [ContentSection.DEVELOPMENT]: {
        index: 2,
        title: 'desarrollo',
    },
    [ContentSection.PRODUCTION]: {
        index: 3,
        title: 'producción',
    },
    [ContentSection.RESULTS]: {
        index: 4,
        title: 'resultados',
    },
    gallery: {
        index: 5,
        title: 'galería',
    },
}

const mapToSubIndexData = (section: ContentSectionData): SubIndexData[] => {
    const isSubindexEmpty = typeof section === 'string' || section === null;
    if (isSubindexEmpty) return [];

    const reducer = (
        prev: HeadingProps['data'][],
        curr: HeadingProps['data']
    ): HeadingProps['data'][] => {
        if (prev.length === 0 || curr.level < prev[0].level) {
            return [curr];
        } else if (curr.level === prev[0].level) {
            return [...prev, curr];
        }

        return prev;
    };

    const childrenToStringReducer = (
        prev: string,
        curr: InnerTextData,
    ) => prev + mapInnerTextToString(curr);

    const mapInnerTextToString = (innerText: InnerTextData): string =>
        innerText.type === 'link'
            ? innerText.children.reduce(childrenToStringReducer, '')
            : innerText.text;

    const mapToSubindex = (
        heading: HeadingProps['data'],
        idx: number
    ): SubIndexData => ({
        index: idx,
        title: heading.children.reduce(childrenToStringReducer, ''),
    });

    const headings = section.filter((content): content is HeadingProps['data'] => content.type === 'heading');
    const topHeadings = headings.reduce(reducer, []).map(mapToSubindex);

    return topHeadings;
};

const isInContentSection = (key: string): key is ContentSection =>
    Object.values(ContentSection).includes(key as ContentSection);

const mapToProjectSection = (section: ContentSection, data: ContentSectionData): MenuItemData => ({
    index: ContentSectionTitles[section].index,
    title: ContentSectionTitles[section].title,
    subIndexes: mapToSubIndexData(data)
});

const mapToMenuItemData = (project: Project) => (section: ContentSection): MenuItemData =>
    mapToProjectSection(section, project.attributes[section]);

const mapProjectDataToMenuItems = (project: Project): MenuItemData[] =>
    Object
        .keys(project.attributes)
        .filter(isInContentSection)
        .map(mapToMenuItemData(project))
        .sort((a, b) => a.index - b.index);

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
        <a href="#"><FiChevronRight style={{ marginRight: '0.5rem' }} />{item.title}</a>
        {item.subIndexes && (
            <ul
                className={`${styles.subMenu} ${activeIndex === idx ? styles.active : ''}`}
            >
                {item.subIndexes.map((subItem, subIndex) => (
                    <li key={subIndex} className={styles.subMenuItem}>
                        <a href='#'>{subItem.title}</a>
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
        <div className={styles.menuContainer}>
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
        </div>
    );
};

export default ContentMenu;
