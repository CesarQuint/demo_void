import { ImageProps } from "../../content-components/content-types/Image";
import {
    Project,
    ContentSectionName,
} from "@/app/Strapi/interfaces/Entities/Project";
import { isInContentSection } from "../ContentMenu";
import { CodeProps } from "../../content-components/content-types/Code";
import { ParagraphProps } from "../../content-components/content-types/Paragraph";
import { HeadingProps } from "../../content-components/content-types/Heading";
import { ListProps } from "../../content-components/content-types/List";
import { QuoteProps } from "../../content-components/content-types/Quote";
import { ContentSectionData } from "../ContentSections";
import { ContentSectionTitles } from "../ContentMenu";
import { InnerTextData } from "../../content-components/content-types/Text";

type SubIndexData = {
    index: number;
    title: string;
};

type MenuItemData = {
    index: number;
    title: string;
    subIndexes?: SubIndexData[];
};

export type ContentData = Array<
    | CodeProps["data"]
    | ParagraphProps["data"]
    | ImageProps["data"]
    | HeadingProps["data"]
    | ListProps["data"]
    | QuoteProps["data"]
>;

const filterImageData = (
    section: Project["attributes"][ContentSectionName]
): ImageProps["data"][] =>
    Array.isArray(section)
        ? section.filter((i): i is ImageProps["data"] => i.type === "image")
        : [];

const mapToImageData =
    (attributes: Project["attributes"]) =>
    (section: ContentSectionName): ImageProps["data"][] =>
        filterImageData(attributes[section]);

export const mapAttributesToContentImages = (
    attributes: Project["attributes"]
): ImageProps["data"][] =>
    Object.keys(attributes)
        .filter(isInContentSection)
        .map(mapToImageData(attributes))
        .flat();

const paragraphIsNotEmpty = (paragraph: ParagraphProps["data"]): boolean =>
    paragraph.children.reduce(
        (prev, curr) =>
            prev || (curr.type === "text" ? !!curr.text.length : true),
        false
    );

const contentArrayIsNotEmpty = (content: ContentData): boolean =>
    content.reduce(
        (prev, curr) =>
            prev ||
            (curr.type === "paragraph" ? paragraphIsNotEmpty(curr) : true),
        false
    );

const contentStringIsNotEmpty = (content: string | null): boolean =>
    typeof content === "string" && !!content.length;

const sectionHasContent =
    (project: Project) =>
    (section: ContentSectionName): boolean =>
        Array.isArray(project.attributes[section])
            ? contentArrayIsNotEmpty(project.attributes[section] as ContentData)
            : contentStringIsNotEmpty(
                  project.attributes[section] as string | null
              );

export const mapToSubIndexData = (
    section: ContentSectionData
): SubIndexData[] => {
    const isSubindexEmpty = typeof section === "string" || section === null;
    if (isSubindexEmpty) return [];

    const reduceHeadingProps = (
        prev: HeadingProps["data"][],
        curr: HeadingProps["data"]
    ): HeadingProps["data"][] => {
        if (prev.length === 0 || curr.level < prev[0].level) {
            return [curr];
        } else if (curr.level === prev[0].level) {
            return [...prev, curr];
        } else {
            return prev;
        }
    };

    const reduceChildrenToString = (prev: string, curr: InnerTextData) =>
        prev + mapInnerTextToString(curr);

    const mapInnerTextToString = (innerText: InnerTextData): string =>
        innerText.type === "link"
            ? innerText.children.reduce(reduceChildrenToString, "")
            : innerText.text;

    const mapToSubindex = (
        heading: HeadingProps["data"],
        idx: number
    ): SubIndexData => ({
        index: idx,
        title: heading.children.reduce(reduceChildrenToString, ""),
    });

    const HEADINGS = section
        .filter(
            (content: ContentData[0]): content is HeadingProps["data"] =>
                content.type === "heading"
        )
        .reduce(reduceHeadingProps, [])
        .map(mapToSubindex);

    return HEADINGS;
};

const mapToProjectSection = (
    section: ContentSectionName,
    data: ContentSectionData
): MenuItemData => ({
    index: ContentSectionTitles[section].index,
    title: ContentSectionTitles[section].title,
    subIndexes: mapToSubIndexData(data),
});

const mapToMenuItemData =
    (project: Project) =>
    (section: ContentSectionName): MenuItemData =>
        mapToProjectSection(section, project.attributes[section]);

export const mapProjectDataToMenuItems = (project: Project): MenuItemData[] =>
    Object.keys(project.attributes)
        .filter(isInContentSection)
        .filter(sectionHasContent(project))
        .map(mapToMenuItemData(project))
        .sort((a, b) => a.index - b.index);
