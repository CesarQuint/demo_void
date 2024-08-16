import { Entity } from "./Entity";

interface Format {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  url: string;
  size: number;
  width: number;
  height: number;
  path: string | null;
  sizeInBytes: number;
}

export interface ImageFormat extends Entity {
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      small: Format;
      medium: Format;
      large: Format;
      thumbnail: Format;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
  }
}
