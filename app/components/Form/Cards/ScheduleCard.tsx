"use client";
import React, { RefObject, useState } from "react";
import Image from "next/image";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../FormCards";
import { Card } from "../CardTemplate";
import TimePicker from "react-time-picker";
import "react-clock/dist/Clock.css";

interface CustomCardProps {
  cardRef: RefObject<HTMLDivElement>;
  clickHandler: (ref: RefObject<HTMLDivElement>) => void;
  returnHandler: () => void;
}

export const ScheduleCard: React.FC<CustomCardProps> = ({
  cardRef,
  clickHandler,
  returnHandler,
}) => {
  const [startDate, setStartDate] = useState("08:00");
  const [endDate, setEndDate] = useState("16:00");

  return (
    <Card
      ref={cardRef}
      scale={0.9}
      top={10}
      left={
        <>
          <section className={styles.left_first}>
            <p>06</p>
            <div className={styles.return_button_top}>
              <ReturnButtons returnHandler={returnHandler} />
            </div>
          </section>
          <section className={styles.left_second}>
            <h2 className={styles.title}>Información del evento</h2>
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
            <form className={styles.schedule_form}>
              <h3>Horario del evento</h3>
              <section className={styles.imput_text}>
                <label htmlFor="">
                  Hora de Inicio
                  <p style={{ display: "inline", color: "red", margin: 0 }}>
                    *
                  </p>
                </label>
                <TimePicker
                  value={startDate}
                  format="HH:mm"
                  onChange={(e) => {
                    setStartDate(e as string);
                  }}
                  clearIcon={null}
                  disableClock={true}
                />
              </section>
              <section className={styles.imput_text}>
                <label htmlFor="">
                  Hora de Finalizacion
                  <p style={{ display: "inline", color: "red", margin: 0 }}>
                    *
                  </p>
                </label>
                <TimePicker
                  format="HH:mm"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e as string);
                  }}
                  clearIcon={null}
                  disableClock={true}
                />
              </section>
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
