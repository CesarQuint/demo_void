import React, { Children } from "react";
import styles from "../../css/Form/form.module.css";

interface ChildrenCard {
  left: any;
  right: any;
}

const Card = (props: ChildrenCard) => {
  return (
    <div className={styles.card}>
      <section className={styles.card_left_content}>
        {props.left}
        {/* <div className={styles.number}></div>
      <div className={styles.title}></div>
      <div className={styles.warning}></div> */}
      </section>
      <section className={styles.card_right_content}>
        {props.right}
        {/* <div className={styles.back}></div>
      <div className={styles.form}></div>
      <div className={styles.continue}></div> */}
      </section>
    </div>
  );
};
const FormCards = () => {
  return (
    <section className={styles.main}>
      <div className={styles.cards_container}>
        <Card left={<div>hellows</div>} right={<div>hell2ows</div>} />
      </div>
    </section>
  );
};

export default FormCards;
