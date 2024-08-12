import React, { RefObject, useRef } from "react";
import styles from "../../css/Form/form.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import arrow from "../../../public/images/wArrow.svg";
import wArrow from "../../../public/images/arrow.svg";

gsap.registerPlugin(useGSAP);

class CardsStack {
  private cardStack: React.RefObject<HTMLDivElement>[];

  constructor(array: React.RefObject<HTMLDivElement>[]) {
    this.cardStack = array;
  }

  unshift(item: React.RefObject<HTMLDivElement>) {
    if (!this.has(item)) this.cardStack.unshift(item);
  }

  shift(item: React.RefObject<HTMLDivElement>) {
    if (this.has(item)) this.cardStack.shift();
  }

  has(item: React.RefObject<HTMLDivElement>) {
    return this.cardStack.includes(item);
  }

  get() {
    return this.cardStack;
  }
}

interface ChildrenCard {
  ref: RefObject<HTMLDivElement>;
  justify?: string;
  left?: any;
  right: any;
  top: number;
  scale: number;
}

const Card = React.forwardRef<HTMLDivElement, Omit<ChildrenCard, "ref">>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        style={{ top: `${props.top}vh`, transform: `scale(${props.scale})` }}
        className={styles.card}
      >
        <section className={styles.card_left_content}>{props.left}</section>
        <section
          style={{ justifyContent: props.justify || "space-around" }}
          className={styles.card_right_content}
        >
          {props.right}
        </section>
      </div>
    );
  }
);

const FormCards = () => {
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);
  const card4 = useRef<HTMLDivElement>(null);
  const card5 = useRef<HTMLDivElement>(null);
  const card6 = useRef<HTMLDivElement>(null);
  const card7 = useRef<HTMLDivElement>(null);
  const card8 = useRef<HTMLDivElement>(null);
  const card9 = useRef<HTMLDivElement>(null);
  const card10 = useRef<HTMLDivElement>(null);
  const card11 = useRef<HTMLDivElement>(null);
  const card12 = useRef<HTMLDivElement>(null);

  let availableCards = new CardsStack([
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card9,
    card10,
    card11,
    card12,
  ]);

  let animatedCards = new CardsStack([]);

  const { contextSafe } = useGSAP();

  const clickHandler = contextSafe(
    (ref: React.RefObject<HTMLDivElement>, color = "red") => {
      gsap.to(ref.current, {
        y: "-150%",
      });

      availableCards.has(ref) && availableCards.shift(ref);

      availableCards.get().forEach((card, i) => {
        if (i < 2) {
          gsap.to(card.current, {
            top: `-=${4}vh`,
            scale: "+=0.02",
          });
        } else {
          gsap.to(card.current, { scale: "+=0.02" });
        }
      });

      animatedCards.unshift(ref);
    }
  );

  const returnHandler = contextSafe(() => {
    const prevCard = animatedCards.get()[0];

    gsap.to(prevCard.current, {
      y: "0",
    });

    animatedCards.has(prevCard) && animatedCards.shift(prevCard);

    availableCards.get().forEach((card, i) => {
      if (i < 2) {
        gsap.to(card.current, {
          top: `+=${4}vh`,
          scale: "-=0.02",
        });
      } else {
        gsap.to(card.current, { scale: "-=0.02" });
      }
    });

    availableCards.unshift(prevCard);
  });

  return (
    <section className={styles.main}>
      <div className={styles.cards_container}>
        <Card
          ref={card12}
          scale={0.78}
          top={10}
          left={<></>}
          right={
            <>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_first}
              >
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
                  REGRESAR
                </button>
              </section>
              <section className={styles.right_second}>
                <h2>¡Gracias!</h2>
                <h4>Nos contactaremos contigo lo antes posible.</h4>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card12, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  IR AL HOME
                </button>
                <button
                  onClick={() => clickHandler(card12, "green")}
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
        <Card
          ref={card11}
          scale={0.8}
          top={10}
          left={
            <>
              <section className={styles.left_first}>
                <p>11</p>
              </section>
              <section className={styles.left_second}>
                <h2 className={styles.title}>Información extra</h2>
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
                  REGRESAR
                </button>
              </section>
              <section className={styles.right_second}>
                <form>
                  <textarea name="" id=""></textarea>
                </form>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card11, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  CONTINUAR
                </button>
                <button
                  onClick={() => clickHandler(card11, "green")}
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
        <Card
          ref={card10}
          scale={0.82}
          top={10}
          left={
            <>
              <section className={styles.left_first}>
                <p>10</p>
              </section>
              <section className={styles.left_second}>
                <h2 className={styles.title}>Sistemas complementarios</h2>
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
                  REGRESAR
                </button>
              </section>
              <section className={styles.right_second}>
                <form>
                  <textarea name="" id=""></textarea>
                </form>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card10, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  CONTINUAR
                </button>
                <button
                  onClick={() => clickHandler(card10, "green")}
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
        {
          //** Nineth Card Region */
        }
        <Card
          ref={card9}
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
                  REGRESAR
                </button>
              </section>
              <section className={styles.right_second}>
                <form>
                  <textarea name="" id=""></textarea>
                </form>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card9, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  CONTINUAR
                </button>
                <button
                  onClick={() => clickHandler(card9, "green")}
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
        {
          //** Eight Card Region */
        }
        <Card
          ref={card8}
          scale={0.86}
          top={10}
          left={
            <>
              <section className={styles.left_first}>
                <p>08</p>
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
                  REGRESAR
                </button>
              </section>
              <section className={styles.right_second}>
                <h1>Duracion del Contenido</h1>
                <p>Hey</p>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card8, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  CONTINUAR
                </button>
                <button
                  onClick={() => clickHandler(card8, "green")}
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
        {
          //** Seventh Card Region */
        }
        <Card
          ref={card7}
          scale={0.88}
          top={10}
          left={
            <>
              <section className={styles.left_first}>
                <p>07</p>
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
                  REGRESAR
                </button>
              </section>
              <section className={styles.right_second}>
                <p>
                  ¿Qué tipo de proyecto buscas?
                  <span style={{ display: "inline", color: "red", margin: 0 }}>
                    *
                  </span>
                </p>
                <div
                  style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    gap: "2vw",
                  }}
                >
                  <section className={styles.project_column}>
                    <div className={styles.input_place}>
                      <input
                        type="radio"
                        name="area"
                        id="inside"
                        value="inside"
                      />
                      <label htmlFor="">Mapping sobre fachada</label>
                    </div>
                    <div className={styles.input_place}>
                      <input
                        type="radio"
                        name="area"
                        id="outside"
                        value="outside"
                      />
                      <label htmlFor="">Experiencia inmersiva</label>
                    </div>
                    <div className={styles.input_place}>
                      <input
                        type="radio"
                        name="area"
                        id="outside"
                        value="outside"
                      />
                      <label htmlFor="">Activación de marca</label>
                    </div>
                  </section>
                  <section className={styles.project_column}>
                    <div className={styles.input_place}>
                      <input
                        type="radio"
                        name="area"
                        id="inside"
                        value="inside"
                      />
                      <label htmlFor="">Mapping sobre fachada</label>
                    </div>
                    <div className={styles.input_place}>
                      <input
                        type="radio"
                        name="area"
                        id="outside"
                        value="outside"
                      />
                      <label htmlFor="">Experiencia inmersiva</label>
                    </div>
                    <div className={styles.input_place}>
                      <input
                        type="radio"
                        name="area"
                        id="outside"
                        value="outside"
                      />
                      <label htmlFor="">Activación de marca</label>
                    </div>
                  </section>
                </div>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card7, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  CONTINUAR
                </button>
                <button
                  onClick={() => clickHandler(card7, "green")}
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
        {
          //** Sixth Card Region */
        }
        <Card
          ref={card6}
          scale={0.9}
          top={10}
          left={
            <>
              <section className={styles.left_first}>
                <p>06</p>
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
                  REGRESAR
                </button>
              </section>
              <section className={styles.right_second}>
                <form>
                  <h3>Horario del evento</h3>
                </form>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card6, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  CONTINUAR
                </button>
                <button
                  onClick={() => clickHandler(card6, "green")}
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
        {
          //** Fifth Card Region */
        }
        <Card
          ref={card5}
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
                  REGRESAR
                </button>
              </section>
              <section className={styles.right_second}>
                <h2>Seleccion de fechas</h2>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card5, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  CONTINUAR
                </button>
                <button
                  onClick={() => clickHandler(card5, "green")}
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
        {
          //** Fourth Card Region */
        }
        <Card
          ref={card4}
          scale={0.94}
          top={10}
          left={
            <>
              <section className={styles.left_first}>
                <p>04</p>
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
                  REGRESAR
                </button>
              </section>
              <section className={styles.right_second}>
                <p>
                  Direccion del Evento
                  <span style={{ display: "inline", color: "red", margin: 0 }}>
                    *
                  </span>
                </p>
                <form className={styles.input_form}>
                  <div className={styles.input_place}>
                    <input type="text" />
                  </div>
                </form>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card4, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  CONTINUAR
                </button>
                <button
                  onClick={() => clickHandler(card4, "green")}
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
        {
          //** Third Card Region */
        }
        <Card
          ref={card3}
          scale={0.96}
          top={10}
          left={
            <>
              <section className={styles.left_first}>
                <p>03</p>
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
                  REGRESAR
                </button>
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
                    <input
                      type="radio"
                      name="area"
                      id="inside"
                      value="inside"
                    />
                  </div>
                  <div className={styles.input_place}>
                    <label htmlFor="">Exterior</label>
                    <input
                      type="radio"
                      name="area"
                      id="outside"
                      value="outside"
                    />
                  </div>
                </form>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card3, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  CONTINUAR
                </button>
                <button
                  onClick={() => clickHandler(card3, "green")}
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
        {
          //** Second Card Region */
        }
        <Card
          ref={card2}
          scale={0.98}
          top={6}
          left={
            <>
              <section className={styles.left_first}>
                <p>02</p>
              </section>
              <section className={styles.left_second}>
                <h2 className={styles.title}>Datos de Contacto</h2>
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
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
                <button
                  onClick={() => {
                    returnHandler();
                  }}
                  className={styles.white_button}
                >
                  REGRESAR
                </button>
              </section>
              <section className={styles.right_second}>
                <form className={styles.contact}>
                  <div className={styles.contact_column}>
                    <section className={styles.imput_text}>
                      <label htmlFor="">
                        Nombre
                        <p
                          style={{ display: "inline", color: "red", margin: 0 }}
                        >
                          *
                        </p>
                      </label>
                      <input
                        className={styles.input_white}
                        type="text"
                        name=""
                        id=""
                      />
                    </section>
                    <section className={styles.imput_text}>
                      <label htmlFor="">
                        Teléfono
                        <p
                          style={{ display: "inline", color: "red", margin: 0 }}
                        >
                          *
                        </p>
                      </label>
                      <input
                        className={styles.input_white}
                        type="text"
                        name=""
                        id=""
                      />
                    </section>
                  </div>
                  <div className={styles.contact_column}>
                    <section className={styles.imput_text}>
                      <label htmlFor="">
                        Organización
                        <p
                          style={{ display: "inline", color: "red", margin: 0 }}
                        >
                          *
                        </p>
                      </label>
                      <input
                        className={styles.input_white}
                        type="text"
                        name=""
                        id=""
                      />
                    </section>
                    <section className={styles.imput_text}>
                      <label htmlFor="">
                        Email
                        <p
                          style={{ display: "inline", color: "red", margin: 0 }}
                        >
                          *
                        </p>
                      </label>
                      <input
                        className={styles.input_white}
                        type="text"
                        name=""
                        id=""
                      />
                    </section>
                  </div>
                </form>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card2, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  CONTINUAR
                </button>
                <button
                  onClick={() => clickHandler(card2, "green")}
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
        {
          //** Fisrs Card Region */
        }
        <Card
          justify="center"
          ref={card1}
          scale={1}
          top={2}
          left={
            <>
              <section className={styles.left_first}></section>
              <section className={styles.left_second}>
                <h2 className={styles.title}>
                  ¡Hagamos una realidad distinta!
                </h2>
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
                  respuestas, podremos ofrecerte una cotización rápida y
                  precisa.
                </p>
                <p>
                  Nos pondremos en contacto para afinar algunos detalles si es
                  necesario.
                </p>
                <p> ¡Gracias por tu colaboración!</p>
              </section>
              <section className={styles.right_third}>
                <button
                  onClick={() => clickHandler(card1, "green")}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  CONTINUAR
                </button>
                <button
                  onClick={() => clickHandler(card1, "green")}
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
      </div>
    </section>
  );
};

export default FormCards;
