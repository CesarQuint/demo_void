import { Entity } from "./Entity";
import { ImageContent } from "./ImageFormat";

export interface Category extends Entity {
    attributes: {
        Name: string;
        LongName: string;
        IconImageText: string;
        IconImage: { data: { id: number; attributes: ImageContent } };
        Description: string | null;
        slug: string;
        createdAt: string;
        updatedAt: string;
    };
}
