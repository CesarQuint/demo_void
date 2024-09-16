import Image from "next/image";
import { ImageContent } from "@/app/Strapi/interfaces/Entities/ImageFormat";
import styles from './Image.module.css';

type ImageText = {
    type: 'text';
    text: string;
};

type ImageData = {
    type: 'image';
    image: ImageContent;
    children: ImageText[];
};

export type ImageProps = { data: ImageData };

const chooseFormat = (data: ImageData['image']) =>
    data.formats.large ??
    data.formats.medium ??
    data.formats.small ??
    data.formats.thumbnail;

const CaseStudyImage = ({ data }: ImageProps): React.JSX.Element =>
(
    <div className={styles.imageContainer}>
        <figure className={styles.imageFigure}>
            <Image
                className={styles.imageImg}
                src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + chooseFormat(data.image).url}
                alt={data.image.alternativeText || 'Image'}
                width={data.image.width}
                height={data.image.height}
                layout="responsive"
                objectFit="cover"
                priority
            />
            {data.image.caption &&
                <figcaption className={styles.imageCaption}>
                    {data.image.caption}
                </figcaption>
            }
        </figure>
    </div>
);

export default CaseStudyImage;
