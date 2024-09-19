import { Entity } from "./Entity";

type ImageFormat = {
    url: string;
    width: number;
    height: number;
};

type ImageFormats = {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
};

export type ImageContent = {
    name: string;
    alternativeText: string;
    url: string;
    caption: string | null;
    width: number;
    height: number;
    formats: ImageFormats;
};

export interface ImageEntity extends Entity {
    attributes: ImageContent;
}
