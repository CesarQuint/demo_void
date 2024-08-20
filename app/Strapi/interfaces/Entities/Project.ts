import { Entity } from "./Entity";
import { Category } from "./Category"
import { ImageFormat } from "./ImageFormat";

export type TextBlock = { type: string, text: string };
export type SectionBlock = { type: string, children: TextBlock[] };
export type HeadingProps = SectionBlock & { level: number };
export type Content = SectionBlock & HeadingProps & { image: ImageFormat };

export interface Project extends Entity {
  attributes: {
    Title: string;
    slug: string;
    EventDate: string;
    Subtitle: string;
    Cover: { data: { id: number, attributes: ImageFormat } };
    Category: { data: Category };
    Location: string;
    Introduction: Content[];
    Conceptualization: Content[];
    Development: Content[];
    Production: Content[];
    Videomapping: Content[];
    Illumination: Content[];
    Animation: Content[];
    Interactivity: Content[];
    Credits: Content[];
  };
};
