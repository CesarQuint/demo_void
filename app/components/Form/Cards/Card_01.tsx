import React, { RefObject, useRef } from "react";
import styles from "../../css/Form/form.module.css";
import { Card } from "../CardTemplate";
import Image from "next/image";
import arrow from "../../../../public/images/wArrow.svg";
import wArrow from "../../../../public/images/arrow.svg";

interface ChildrenCard {
  ref: RefObject<HTMLDivElement>;
}

export const Card_01 = React.forwardRef<
  HTMLDivElement,
  Omit<ChildrenCard, "ref">
>((props, ref) => {
  return (
    <Card
      justify="center"
      ref={ref}
      scale={1}
      top={2}
      left={
        <>
          <section className={styles.left_first}></section>
          <section className={styles.left_second}>
            <h2 className={styles.title}>¡Hagamos una realidad distinta!</h2>
          </section>
          <section className={styles.left_third}></section>
        </>
      }
      right={
        <>
          <section className={styles.right_first}>
            <button className={styles.white_button}>
              <Image
                style={{
                  width: "2vw",
                  height: "2vh",
                  backgroundColor: "white",
                  transform: "rotate(180deg)",
                }}
                width={1000}
                height={1000}
                src={arrow}
                alt="arrow"
              />
            </button>
            <button className={styles.white_button}>REGRESAR</button>
          </section>
          <section className={styles.right_second}>
            <p>
              Te invitamos a responder a nuestro breve cuestionario. Con tus
              respuestas, podremos ofrecerte una cotización rápida y precisa.
            </p>
            <p>
              Nos pondremos en contacto para afinar algunos detalles si es
              necesario.
            </p>
            <p> ¡Gracias por tu colaboración!</p>
          </section>
          <section className={styles.right_third}>
            <button
              onClick={() => clickHandler(ref, "green")}
              style={{ padding: "1rem", borderRadius: "40px" }}
              className={styles.black_button}
            >
              CONTINUAR
            </button>
            <button
              onClick={() => clickHandler(ref, "green")}
              style={{
                padding: "10px",
                borderRadius: "50%",
              }}
              className={styles.black_button}
            >
              <Image
                style={{
                  width: "2vw",
                  height: "2vw",
                }}
                width={1000}
                height={1000}
                src={wArrow}
                alt="arrow"
              />
            </button>
          </section>
        </>
      }
    />
  );
});
