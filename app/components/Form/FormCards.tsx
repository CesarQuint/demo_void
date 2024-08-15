import React, { RefObject, useRef } from "react";
import styles from "../../css/Form/form.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import arrow from "../../../public/images/wArrow.svg";
import wArrow from "../../../public/images/arrow.svg";
import { Card } from "./CardTemplate";

import { WelcomeCard } from "./Cards/CardWelcome";
import { ContactCard } from "./Cards/CardContact";
import { PlaceTypeCard } from "./Cards/PlaceTypeCard";
import { ExtraInformationCard } from "./Cards/ExtraInformationCard";
import { ComplemetarySystemsCard } from "./Cards/ComplemetarySystems";
import { AboutYourProjectCard } from "./Cards/AboutYourProjectCard";
import { LookingForProjectCard } from "./Cards/LookingForProject";
import { DatesAvailableCard } from "./Cards/DatesAvailableCard";
import { ScheduleCard } from "./Cards/ScheduleCard";
import { EventDurationCard } from "./Cards/EventDurationCard";
import { LocationCard } from "./Cards/LocationCard";

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

export const ReturnButtons = ({
  returnHandler,
}: {
  returnHandler: () => void;
}) => {
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
            backgroundColor: " #ededed",
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

export const ContinueButtons = ({
  clickHandler,
}: {
  clickHandler: () => void;
}) => {
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
          className={styles.arrow_button}
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
                <ContinueButtons clickHandler={() => {}} />
              </section>
            </>
          }
        />
        <ExtraInformationCard
          cardRef={card11}
          clickHandler={() => clickHandler(card11)}
          returnHandler={() => {
            returnHandler();
          }}
        />

        <ComplemetarySystemsCard
          cardRef={card10}
          clickHandler={() => clickHandler(card10)}
          returnHandler={() => {
            returnHandler();
          }}
        />

        <AboutYourProjectCard
          cardRef={card9}
          clickHandler={() => clickHandler(card9)}
          returnHandler={() => {
            returnHandler();
          }}
        />

        <EventDurationCard
          cardRef={card8}
          clickHandler={() => clickHandler(card8)}
          returnHandler={() => {
            returnHandler();
          }}
        />

        <LookingForProjectCard
          cardRef={card7}
          clickHandler={() => clickHandler(card7)}
          returnHandler={() => {
            returnHandler();
          }}
        />

        <ScheduleCard
          cardRef={card6}
          clickHandler={() => clickHandler(card6)}
          returnHandler={() => {
            returnHandler();
          }}
        />

        <DatesAvailableCard
          cardRef={card5}
          clickHandler={() => clickHandler(card5)}
          returnHandler={() => {
            returnHandler();
          }}
        />

        <LocationCard
          cardRef={card4}
          clickHandler={() => clickHandler(card4)}
          returnHandler={() => {
            returnHandler();
          }}
        />

        <PlaceTypeCard
          cardRef={card3}
          clickHandler={() => clickHandler(card3)}
          returnHandler={() => {
            returnHandler();
          }}
        />

        <ContactCard
          cardRef={card2}
          clickHandler={() => clickHandler(card2)}
          returnHandler={() => {
            returnHandler();
          }}
        />

        <WelcomeCard
          cardRef={card1}
          clickHandler={() => clickHandler(card1)}
          returnHandler={() => {}}
        />
      </div>
    </section>
  );
};

export default FormCards;
