import React, { RefObject, useState } from "react";
import Image from "next/image";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../FormCards";
import { Card } from "../CardTemplate";
import TimePicker from "react-time-picker";

interface CustomCardProps {
  cardRef: RefObject<HTMLDivElement>;
  clickHandler: (ref: RefObject<HTMLDivElement>) => void;
  returnHandler: () => void;
}

export const EventDurationCard: React.FC<CustomCardProps> = ({
  cardRef,
  clickHandler,
  returnHandler,
}) => {
  const [startDate, setStartDate] = useState("00:00");
  return (
    <Card
      ref={cardRef}
      scale={0.86}
      top={10}
      left={
        <>
          <section className={styles.left_first}>
            <p>08</p>
            <div className={styles.return_button_top}>
              <ReturnButtons returnHandler={returnHandler} />
            </div>
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
            <h1>Duracion del Contenido</h1>
            <section className="duration">
              <label htmlFor=""></label>
              <TimePicker
                value={startDate}
                onChange={(e) => {
                  setStartDate(e as string);
                }}
                format="HH:mm"
                clockIcon={null}
                clearIcon={null}
                disableClock={true}
              />
            </section>
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
