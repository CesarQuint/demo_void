import Image from "next/image";
import { ImageContent } from "@/app/Strapi/interfaces/Entities/ImageFormat";
import styles from '../../../../css/case-study/content-components.module.css'

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

const CaseStudyImage = ({ data }: ImageProps): React.JSX.Element =>
(
    <div className={styles.case_study_img}>
        <figure>
            <Image
                src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + data.image.url}
                alt={data.image.alternativeText || 'Image'}
                width={data.image.width}
                height={data.image.height}
                layout="responsive"
                objectFit="cover"
                priority
            />
            {data.image.caption &&
                <figcaption>
                    {data.image.caption}
                </figcaption>
            }
        </figure>
    </div>
);

export default CaseStudyImage;
