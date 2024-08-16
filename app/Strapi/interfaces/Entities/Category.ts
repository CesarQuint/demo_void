import { Entity } from "./Entity";

export interface Category extends Entity {
  attributes: {
    Name: string;
    Description: string | null;
    createdAt: string;
    updatedAt: string;
  }
};
