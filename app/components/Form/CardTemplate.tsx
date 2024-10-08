import React, { RefObject, useRef } from "react";
import styles from "../../css/Form/form.module.css";

interface ChildrenCard {
    ref: RefObject<HTMLDivElement>;
    justify?: string;
    left: any;
    right: any;
    top: number;
    scale: number;
}

export const Card = React.forwardRef<HTMLDivElement, Omit<ChildrenCard, "ref">>(
    (props, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    top: `${props.top}vh`,
                    transform: `scale(${props.scale})`,
                }}
                className={styles.card}
            >
                <section className={styles.card_left_content}>
                    {props.left}
                </section>
                <section
                    style={{ justifyContent: props.justify || "space-around" }}
                    className={styles.card_right_content}
                >
                    {props.right}
                </section>
            </div>
        );
    },
);

Card.displayName = "Card";
