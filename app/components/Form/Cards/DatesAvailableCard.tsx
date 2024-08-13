"use client";
import React, { RefObject } from "react";
import Image from "next/image";
import styles from "../../../css/Form/form.module.css"; // Adjust the import based on your structure
import { ContinueButtons, ReturnButtons } from "../FormCards";
import { Card } from "../CardTemplate";
import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { Range } from "react-calendar/dist/cjs/shared/types";

interface CustomCardProps {
  cardRef: RefObject<HTMLDivElement>;
  clickHandler: (ref: RefObject<HTMLDivElement>) => void;
  returnHandler: () => void;
}

const formatShortWeekday = (locale: string | undefined, date: Date): string => {
  const weekdays = ["D", "L", "M", "M", "J", "V", "S"];
  return weekdays[date.getDay()];
};

export const DatesAvailableCard: React.FC<CustomCardProps> = ({
  cardRef,
  clickHandler,
  returnHandler,
}) => {
  const [selectedDates, setSelectedDates] = React.useState<
    Date | [Date, Date] | null
  >(null);

  const handleDateChange = (value: Value) => {
    console.log("Selected date(s):", value);
    setSelectedDates(value as Date | [Date, Date]);
  };
  return (
    <Card
      ref={cardRef}
      scale={0.92}
      top={10}
      left={
        <>
          <section className={styles.left_first}>
            <p>05</p>
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
            <div className={styles.calendar_flex}>
              <section className={styles.dates_flex} style={{ width: "40%" }}>
                <h4>
                  Disponibilidad de fechas
                  <p style={{ display: "inline", color: "red", margin: 0 }}>
                    *
                  </p>
                </h4>
                <section className={styles.imput_text}>
                  <label htmlFor="">
                    Fecha de Inicio
                    <p style={{ display: "inline", color: "red", margin: 0 }}>
                      *
                    </p>
                  </label>
                  <input
                    value={
                      Array.isArray(selectedDates)
                        ? selectedDates[0].toLocaleDateString() // Format the date as desired
                        : "--/--/----"
                    }
                    readOnly={true}
                    className={styles.input_date}
                    type="text"
                    name=""
                    id=""
                  />
                </section>
                <section className={styles.imput_text}>
                  <label htmlFor="">
                    Fecha de Finalizacion
                    <p style={{ display: "inline", color: "red", margin: 0 }}>
                      *
                    </p>
                  </label>
                  <input
                    value={
                      Array.isArray(selectedDates)
                        ? selectedDates[1].toLocaleDateString() // Format the date as desired
                        : "--/--/----"
                    }
                    readOnly={true}
                    className={styles.input_date}
                    type="text"
                    name=""
                    id=""
                  />
                </section>
              </section>
              <section style={{ width: "60%" }}>
                <div className={styles.calendar_container}>
                  <Calendar
                    className="calender-body"
                    formatShortWeekday={formatShortWeekday}
                    selectRange={true}
                    onChange={(e) => {
                      handleDateChange(e);
                    }}
                    value={selectedDates}
                  />
                </div>
              </section>
            </div>
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
