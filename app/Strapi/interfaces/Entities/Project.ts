import { Entity } from "./Entity";
import { Category } from "./Category"
import { ImageContent } from "./ImageFormat";

import { ContentData } from "@/app/components/case-study/section-components/ContentSections";

export enum ContentSectionName {
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

        [ContentSectionName.INTRODUCTION]: string;
        [ContentSectionName.CONCEPTUALIZATION]: ContentData | null;
        [ContentSectionName.DEVELOPMENT]: ContentData | null;
        [ContentSectionName.PRODUCTION]: ContentData | null;
        [ContentSectionName.RESULTS]: ContentData | null;
        Credits: ContentData | null;
    };
};
