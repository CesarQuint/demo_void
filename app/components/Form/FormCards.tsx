import React, { RefObject, useRef } from "react";
import styles from "../../css/Form/form.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import arrow from "../../../public/images/wArrow.svg";
import wArrow from "../../../public/images/arrow.svg";
import { Card } from "./CardTemplate";
import Calendar from "react-calendar";

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
  right?: any;
  top: number;
  scale: number;
  fullcard?: any;
}

const FareWellCard = React.forwardRef<
  HTMLDivElement,
  Omit<ChildrenCard, "ref">
>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{ top: `${props.top}vh`, transform: `scale(${props.scale})` }}
      className={styles.card}
    >
      <section className={styles.farewell_card}>{props.fullcard}</section>
    </div>
  );
});

const ReturnButtons = ({ returnHandler }: { returnHandler: () => void }) => {
  return (
    <>
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
    </>
  );
};
const ContinueButtons = ({ clickHandler }: { clickHandler: () => void }) => {
  return (
    <>
      <button
        onClick={() => clickHandler()}
        style={{ padding: "1rem", borderRadius: "40px" }}
        className={styles.black_button}
      >
        CONTINUAR
      </button>
      <button
        onClick={() => clickHandler()}
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
    </>
  );
};

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

  const clickHandler = contextSafe((ref: React.RefObject<HTMLDivElement>) => {
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
  });

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
        <FareWellCard
          justify="center"
          ref={card12}
          scale={0.78}
          top={10}
          fullcard={
            <>
              <section style={{ justifyContent: "flex-end" }}>
                <ReturnButtons returnHandler={returnHandler} />
              </section>
              <section
                style={{ alignItems: "center" }}
                className={styles.right_second}
              >
                <h2>¡Gracias!</h2>
                <h4>Nos contactaremos contigo lo antes posible.</h4>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <button
                  onClick={() => clickHandler(card12)}
                  style={{ padding: "1rem", borderRadius: "40px" }}
                  className={styles.black_button}
                >
                  IR AL HOME
                </button>
                <button
                  onClick={() => clickHandler(card12)}
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
                <ReturnButtons returnHandler={returnHandler} />
              </section>
              <section className={styles.right_second}>
                <form>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column nowrap",
                      gap: "2vw",
                      marginBottom: "3vh",
                    }}
                  >
                    <p>¿Habrá invitados especiales?</p>
                    <section className={styles.form_row}>
                      <div className={styles.input_place}>
                        <input
                          type="radio"
                          name="area"
                          id="inside"
                          value="inside"
                        />
                        <label htmlFor="">Si</label>
                      </div>
                      <div className={styles.input_place}>
                        <input
                          type="radio"
                          name="area"
                          id="inside"
                          value="inside"
                        />
                        <label htmlFor="">No</label>
                      </div>
                    </section>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column nowrap",
                      gap: "2vw",
                    }}
                  >
                    <p>
                      ¿Tienes un layout con la ubicación de escenario, asientos
                      y área para house?
                    </p>
                    <section className={styles.form_row}>
                      <div className={styles.input_place}>
                        <input
                          type="radio"
                          name="area"
                          id="inside"
                          value="inside"
                        />
                        <label htmlFor="">Si</label>
                      </div>
                      <div className={styles.input_place}>
                        <input
                          type="radio"
                          name="area"
                          id="inside"
                          value="inside"
                        />
                        <label htmlFor="">No</label>
                      </div>
                    </section>
                  </div>
                </form>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <ContinueButtons
                  clickHandler={() => {
                    clickHandler(card11);
                  }}
                />
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
                <ReturnButtons returnHandler={returnHandler} />
              </section>
              <section className={styles.right_second}>
                <form>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column nowrap",
                      gap: "2vw",
                      marginBottom: "3vh",
                    }}
                  >
                    ¿Incluimos sistema de audio además de los equipos de
                    proyección?
                    <section className={styles.form_row}>
                      <div className={styles.input_place}>
                        <input
                          type="radio"
                          name="area"
                          id="inside"
                          value="inside"
                        />
                        <label htmlFor="">Si</label>
                      </div>
                      <div className={styles.input_place}>
                        <input
                          type="radio"
                          name="area"
                          id="inside"
                          value="inside"
                        />
                        <label htmlFor="">No</label>
                      </div>
                    </section>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column nowrap",
                      gap: "2vw",
                    }}
                  >
                    <p>
                      ¿Incluimos un kit de iluminación complementaria para el
                      evento?
                    </p>
                    <section className={styles.form_row}>
                      <div className={styles.input_place}>
                        <input
                          type="radio"
                          name="area"
                          id="inside"
                          value="inside"
                        />
                        <label htmlFor="">Si</label>
                      </div>
                      <div className={styles.input_place}>
                        <input
                          type="radio"
                          name="area"
                          id="inside"
                          value="inside"
                        />
                        <label htmlFor="">No</label>
                      </div>
                    </section>
                  </div>
                </form>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <ContinueButtons
                  clickHandler={() => {
                    clickHandler(card10);
                  }}
                />
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
                <ReturnButtons returnHandler={returnHandler} />
              </section>
              <section className={styles.right_second}>
                <form>
                  <div className={styles.journey}>
                    <label>
                      ¿Puedes describir la experiencia de usuario o user
                      journey?
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
                    clickHandler(card9);
                  }}
                />
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
                <ReturnButtons returnHandler={returnHandler} />
              </section>
              <section className={styles.right_second}>
                <h1>Duracion del Contenido</h1>
                <p>Hey</p>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <ContinueButtons
                  clickHandler={() => {
                    clickHandler(card8);
                  }}
                />
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
                <ReturnButtons returnHandler={returnHandler} />
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
                <ContinueButtons
                  clickHandler={() => {
                    clickHandler(card7);
                  }}
                />
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
                <ReturnButtons returnHandler={returnHandler} />
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
                <ContinueButtons
                  clickHandler={() => {
                    clickHandler(card6);
                  }}
                />
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
                <ReturnButtons returnHandler={returnHandler} />
              </section>
              <section className={styles.right_second}>
                <h2>Seleccion de fechas</h2>
              </section>
              <section
                style={{ justifyContent: "flex-end" }}
                className={styles.right_third}
              >
                <ContinueButtons
                  clickHandler={() => {
                    clickHandler(card5);
                  }}
                />
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
                <ReturnButtons returnHandler={returnHandler} />
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
                <ContinueButtons
                  clickHandler={() => {
                    clickHandler(card4);
                  }}
                />
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
                <ContinueButtons
                  clickHandler={() => {
                    clickHandler(card3);
                  }}
                />
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
                <ReturnButtons returnHandler={returnHandler} />
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
                <ContinueButtons
                  clickHandler={() => {
                    clickHandler(card2);
                  }}
                />
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
                <ContinueButtons
                  clickHandler={() => {
                    clickHandler(card1);
                  }}
                />
              </section>
            </>
          }
        />
      </div>
    </section>
  );
};

export default FormCards;
