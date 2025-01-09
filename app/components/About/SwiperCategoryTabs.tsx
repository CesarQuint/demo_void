import React, { Fragment, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperProps, SwiperSlide, SwiperClass } from "swiper/react";

import "swiper/css";
import css from "../../css/About/tabs.module.css";

import { Category } from "@/app/Strapi/interfaces/Entities/Category";

type SwiperCategoryTabsProps = {
    categories: Category[];
    activeCategory: number;
    setActiveCategory: (idx: number) => void;
};

export function SwiperCategoryTabs(props: SwiperCategoryTabsProps) {
    const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
        null,
    );

    const onSlideChange: SwiperProps["onSlideChange"] = (swiper) => {
        props.setActiveCategory(swiper.activeIndex);
    };

    return (
        <>
            <CategoryTitles
                categories={props.categories}
                swiper={swiperInstance}
                activeCategory={props.activeCategory}
            />
            <Swiper
                onSwiper={setSwiperInstance}
                className={css.scrollContainer}
                slidesPerView={1}
                onSlideChange={onSlideChange}
            >
                {props.categories.map((category, idx) => (
                    <SwiperSlide className={css.tab} key={idx}>
                        <Image
                            className={css.images}
                            src={category.attributes.IconImageText}
                            width={1000}
                            height={1000}
                            alt="icon image"
                        />
                        <p className={css.text_content}>
                            <Fragment>
                                <span>{category.attributes.Description}</span>
                            </Fragment>
                        </p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

interface CategoryTitlesProps {
    categories: Category[];
    swiper: SwiperClass | null;
    activeCategory: number;
}

const CategoryTitles: React.FC<CategoryTitlesProps> = (props) => {
    const titlesRef = useRef<HTMLDivElement | null>(null);
    const [lineStyle, setLineStyle] = useState<React.CSSProperties>({});

    const getCategoryName = (current: number) =>
        props.categories[current].attributes.LongName ??
        props.categories[current].attributes.Name;

    const constructTitleClassName = (idx: number) =>
        `${css.title} ${idx === props.swiper?.activeIndex ? css.active : ""}`;

    useEffect(() => {
        const calcMarginLeft = (): string =>
            `${(100 / props.categories.length) * props.activeCategory}%`;

        const updateLineStyle = () => {
            if (!titlesRef.current || !props.swiper) return;

            setLineStyle({
                width: `${100 / props.categories.length}%`,
                marginLeft: calcMarginLeft(),
            });
        };

        updateLineStyle();
    }, [props.categories, props.swiper, props.activeCategory]);

    return (
        <>
            <div className={css.titles} ref={titlesRef}>
                <div className={css.options}>
                    {props.categories.map((_, idx) => (
                        <h3
                            key={idx}
                            className={constructTitleClassName(idx)}
                            onClick={() => props.swiper?.slideTo(idx)}
                        >
                            {getCategoryName(idx)}
                        </h3>
                    ))}
                </div>
                <div className={css.line} style={lineStyle}></div>
            </div>
        </>
    );
};
