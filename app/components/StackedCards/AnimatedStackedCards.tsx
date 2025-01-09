"use client";

import React, { useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide, SwiperRef } from "swiper/react";
import { FreeMode, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/effect-coverflow";

import styles from "./AnimatedStackedCards.module.css";
import CardContent from "./CardContent";
import { AboutUsTag } from "@/app/constants/tags_text";

type AnimatedStackedCardsProps = {
    content: Array<AboutUsTag>;
};

const AnimatedStackedCards = (props: AnimatedStackedCardsProps) => {
    const swiperRef = useRef<SwiperRef>(null);

    const handleSwiperEvents = (swiper: SwiperClass) => {
        if (swiper.isEnd && swiper.swipeDirection === "next") {
            window.scrollBy({
                top: window.innerHeight,
                behavior: "smooth",
            });
        }

        if (swiper.isBeginning && swiper.swipeDirection === "prev") {
            window.scrollBy({
                top: -window.innerHeight,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className={styles.main}>
            <span className={styles.gradientTop} />
            <Swiper
                ref={swiperRef}
                direction="vertical"
                slidesPerView="auto"
                freeMode
                spaceBetween={20}
                effect="coverflow"
                modules={[FreeMode, EffectCoverflow]}
                centeredSlides={true}
                coverflowEffect={{
                    rotate: -50,
                    stretch: 50,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false,
                }}
                className={styles.swiper}
                onTouchEnd={(swiper) => handleSwiperEvents(swiper)}
            >
                {props.content.map((content, i) => (
                    <SwiperSlide key={i} className={styles.tag}>
                        <CardContent
                            i={i}
                            img={content.img}
                            title={content.title}
                            number={content.number}
                            content={content.content}
                            setImageLoaded={() => {}}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <span className={styles.gradientBottom} />
        </div>
    );
};

export default AnimatedStackedCards;
