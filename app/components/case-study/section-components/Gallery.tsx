import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Transition, motion, useMotionValue } from "framer-motion";
import { ContentSectionName, Project } from "@/app/Strapi/interfaces/Entities/Project";
import { ImageProps, chooseFormat } from "../content-components/content-types/Image";
import { isInContentSection } from '../section-components/ContentMenu';
import styles from './Gallery.module.css';

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const TRANSITION_CONFIG: Transition = {
    type: "spring",
    bounce: 0.2,
};

type GalleryProps = { data: Project['attributes'] };

const filterImageData = (
    section: Project['attributes'][ContentSectionName]
): ImageProps['data'][] =>
    Array.isArray(section)
        ? section.filter((i): i is ImageProps['data'] => i.type === 'image')
        : [];

const mapToImageData = (attributes: Project['attributes']) =>
    (section: ContentSectionName): ImageProps['data'][] =>
        filterImageData(attributes[section]);

const mapAttributesToContentImages = (
    attributes: Project['attributes']
): ImageProps['data'][] =>
    Object
        .keys(attributes)
        .filter(isInContentSection)
        .map(mapToImageData(attributes))
        .flat();

const GalleryCarousel: React.FC<GalleryProps> = ({ data }) => {
    const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
    const IMAGES = mapAttributesToContentImages(data);
    const dragX = useMotionValue(0);

    const setActiveIdxFromDragX = () =>
        void dragX.get() === 0 && setActiveImageIdx((pv) => pv === IMAGES.length - 1 ? 0 : pv + 1);

    useEffect(() => {
        const interval = setInterval(
            setActiveIdxFromDragX,
            AUTO_DELAY
        );

        return () => clearInterval(interval);
    }, []);

    const onDragEnd = () => {
        const x = dragX.get();
        if (x <= -DRAG_BUFFER && activeImageIdx < IMAGES.length - 1) {
            setActiveImageIdx((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && activeImageIdx > 0) {
            setActiveImageIdx((pv) => pv - 1);
        }
    };

    return (
        <section id="gallery">
            <div className={styles.container}>
                <motion.div
                    drag="x"
                    dragConstraints={{
                        left: 0,
                        right: 0,
                    }}
                    style={{
                        x: dragX
                    }}
                    animate={{
                        translateX: `-${activeImageIdx * 100}%`,
                    }}
                    transition={TRANSITION_CONFIG}
                    onDragEnd={onDragEnd}
                    className={styles.carousel}
                >
                    <Images
                        images={IMAGES}
                        activeIdx={activeImageIdx}
                    />
                </motion.div>

                <Thumbnails
                    images={IMAGES}
                    setActiveIdx={setActiveImageIdx}
                />
            </div>
        </section>
    );
};

const Images: React.FC<{
    images: ImageProps['data'][], activeIdx: number
}> = ({ images, activeIdx }) =>
    (<>
        {images.map((i, idx) => (
            <motion.div
                key={idx}
                style={{
                    backgroundImage:
                        `url(${process.env.NEXT_PUBLIC_STRAPI_BASE_URL + chooseFormat(i.image).url})`,
                }}
                animate={{
                    scale: activeIdx === idx ? 0.95 : 0.85,
                }}
                transition={TRANSITION_CONFIG}
                className={styles.image}
            />
        ))}
    </>);

const Thumbnails: React.FC<{
    images: ImageProps['data'][];
    setActiveIdx: Dispatch<SetStateAction<number>>;
}> = ({
    images,
    setActiveIdx,
}) => (
        <motion.div
            className={styles.thumbnails}
            drag="x"
            dragElastic={0.1}
            whileTap={{ cursor: "grabbing" }}
        >
            {images.map((image, index) => (
                <motion.img
                    key={index}
                    src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + chooseFormat(image.image).url}
                    alt={image.image.alternativeText || 'Image'}
                    className={styles.thumbnail}
                    onClick={() => setActiveIdx(index)}
                    whileHover={{ scale: 1.1 }}
                />
            ))}
        </motion.div>
    );

export default GalleryCarousel;
