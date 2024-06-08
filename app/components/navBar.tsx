import React from "react";
import Link from "next/link";
import styles from "../css/navBar.module.css";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className={styles.main}>
      <section className={styles.nav_container}>
        <Link href={"/frammer_main"}>Home</Link>
        <Link href={"/frammer_2"}>Second</Link>
      </section>
    </div>
  );
};

export default NavBar;
