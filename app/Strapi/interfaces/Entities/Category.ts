import { Entity } from "./Entity";

export interface Category extends Entity {
  attributes: {
    Name: string;
    Description: string | null;
    slug: string;
    createdAt: string;
    updatedAt: string;
  }
};
