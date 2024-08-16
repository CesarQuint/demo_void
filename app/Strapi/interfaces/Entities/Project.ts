import { Entity } from "./Entity";
import { Category } from "./Category"
import { ImageFormat } from "./ImageFormat";

export interface Project extends Entity {
  attributes: {
    Title: string;
    EventDate: string;
    Subtitle: string;
    Cover: { data: ImageFormat };
    Category: { data: Category };
  };
};
