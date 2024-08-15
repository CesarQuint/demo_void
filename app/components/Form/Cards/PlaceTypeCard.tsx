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

export const PlaceTypeCard: React.FC<CustomCardProps> = ({
  cardRef,
  clickHandler,
  returnHandler,
}) => {
  return (
    <Card
      ref={cardRef}
      scale={0.96}
      top={10}
      left={
        <>
          <section className={styles.left_first}>
            <p>03</p>
            <div className={styles.return_button_top}>
              <ReturnButtons returnHandler={returnHandler} />
            </div>
          </section>
          <section className={styles.left_second}>
            <h2 className={styles.title}>Tipo de ubicación</h2>
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
            <p>
              ¿Tu evento es en interior o exterior?
              <span style={{ display: "inline", color: "red", margin: 0 }}>
                *
              </span>
            </p>
            <form className={styles.input_form}>
              <div className={styles.input_place}>
                <label htmlFor="">Interior</label>
                <input type="radio" name="area" id="inside" value="inside" />
              </div>
              <div className={styles.input_place}>
                <label htmlFor="">Exterior</label>
                <input type="radio" name="area" id="outside" value="outside" />
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
