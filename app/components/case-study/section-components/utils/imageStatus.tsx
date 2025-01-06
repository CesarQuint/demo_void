import { ImageProps } from "../../content-components/content-types/Image";
import {
    Project,
    ContentSectionName,
} from "@/app/Strapi/interfaces/Entities/Project";
import { isInContentSection } from "../ContentMenu";

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
