import useWindow from "@/app/utils/hooks/useWindow";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import styles from "./CardContent.module.css";

type TagsContentProps = {
    i: number;
    img: string;
    number: string;
    title: string;
    content: string[];
    setImageLoaded: Dispatch<SetStateAction<boolean>>;
};

const CardContent = (props: TagsContentProps) => {
    const windowStatus = useWindow();

    if (windowStatus && windowStatus.innerWidth < 768) {
        return (
            <div className={styles.cardWrapper}>
                <section className={styles.mobile_head}>
                    <p className={styles.right_numeral}>{props.number}</p>
                    <h5 className={styles.title}>{props.title}</h5>
                </section>
                <section className={styles.image_wrapper}>
                    <Image
                        onLoad={() => {
                            props.setImageLoaded(true);
                        }}
                        width={1000}
                        height={1000}
                        className={styles.image}
                        src={props.img}
                        alt="image_card"
                    />
                </section>
                <div className={styles.right_text_content}>
                    {props.content.map((text, i) => (
                        <p key={i}>{text}</p>
                    ))}
                </div>
            </div>
        );
    }

    if (windowStatus && windowStatus.innerWidth > 768) {
        return (
            <>
                <section className={styles.left_content}>
                    <Image
                        onLoad={() => {
                            props.setImageLoaded(true);
                        }}
                        width={1000}
                        height={1000}
                        className={styles.image}
                        src={props.img}
                        alt="image_card"
                    />
                </section>
                <article className={styles.right_content}>
                    <section>
                        <p className={styles.right_numeral}>{props.number}</p>
                        <h5 className={styles.title}>{props.title}</h5>
                    </section>
                    <div className={styles.right_text_content}>
                        {props.content.map((text, i) => (
                            <p key={i}>{text}</p>
                        ))}
                    </div>
                </article>
            </>
        );
    }
};

export default CardContent;
