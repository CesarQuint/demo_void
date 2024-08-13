import React, { RefObject } from "react";
import Image from "next/image";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../FormCards";
import { Card } from "../CardTemplate";
import arrow from "../../../../public/images/wArrow.svg"; // Adjust the import based on your structure

interface CustomCardProps {
  cardRef: RefObject<HTMLDivElement>;
  clickHandler: (ref: RefObject<HTMLDivElement>) => void;
  returnHandler: () => void;
}

export const AboutYourProjectCard: React.FC<CustomCardProps> = ({
  cardRef,
  clickHandler,
  returnHandler,
}) => {
  return (
    <Card
      ref={cardRef}
      scale={0.84}
      top={10}
      left={
        <>
          <section className={styles.left_first}>
            <p>09</p>
          </section>
          <section className={styles.left_second}>
            <h2 className={styles.title}>Sobre tu proyecto</h2>
          </section>
          <section className={styles.left_third}>
            <p className={styles.warning}>
              Las preguntas marcadas con * son obligatorias.
            </p>
          </section>
        </>
      }
      right={
        <>
          <section
            style={{ justifyContent: "flex-end" }}
            className={styles.right_first}
          >
            <ReturnButtons returnHandler={returnHandler} />
          </section>
          <section className={styles.right_second}>
            <form>
              <div className={styles.journey}>
                <label>
                  ¿Puedes describir la experiencia de usuario o user journey?
                </label>
                <textarea
                  className={styles.text_area}
                  placeholder="Text"
                  name=""
                  id=""
                ></textarea>
              </div>
            </form>
          </section>
          <section
            style={{ justifyContent: "flex-end" }}
            className={styles.right_third}
          >
            <ContinueButtons
              clickHandler={() => {
                clickHandler(cardRef);
              }}
            />
          </section>
        </>
      }
    />
  );
};
