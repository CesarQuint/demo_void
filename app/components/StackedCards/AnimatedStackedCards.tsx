import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
    return (
        <div className={styles.main}>
            <Swiper
                direction="vertical"
                slidesPerView="auto"
                freeMode
                spaceBetween={20}
                effect="coverflow"
                modules={[FreeMode, EffectCoverflow]}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 200,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false,
                }}
                className={styles.swiper}
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
        </div>
    );
};

export default AnimatedStackedCards;
