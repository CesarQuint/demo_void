import React from "react";
import styles from "../../css/About/welcome.module.css";

type Props = {};

const Welcome = (props: Props) => {
  return (
    <section className={styles.welcome_container}>
      <h1 className={styles.welcome_h1}>
        VoidXR es un estudio de artistas multimedia que crea proyectos
        innovadores, ofreciendo experiencias inolvidables mediante el uso de
        tecnología avanzada, interacción intuitiva y narrativas cautivadoras.
      </h1>
    </section>
  );
};

export default Welcome;
