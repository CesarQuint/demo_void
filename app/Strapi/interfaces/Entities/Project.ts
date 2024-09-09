import { Entity } from "./Entity";
import { Category } from "./Category"
import { ImageContent } from "./ImageFormat";

import { ContentData } from "@/app/components/case-study/section-components/Content";

export enum ContentSection {
    INTRODUCTION = 'Introduction',
    CONCEPTUALIZATION = 'Conceptualization',
    DEVELOPMENT = 'Development',
    PRODUCTION = 'Production',
    RESULTS = 'Results',
}

export interface Project extends Entity {
    attributes: {
        Title: string;
        slug: string;
        EventDate: string;
        Subtitle: string;
        Cover: { data: { id: number, attributes: ImageContent } };
        Category: { data: Category };
        Location: string;

        [ContentSection.INTRODUCTION]: string;
        [ContentSection.CONCEPTUALIZATION]: ContentData | null;
        [ContentSection.DEVELOPMENT]: ContentData | null;
        [ContentSection.PRODUCTION]: ContentData | null;
        [ContentSection.RESULTS]: ContentData | null;
        Credits: ContentData | null;
    };
};
