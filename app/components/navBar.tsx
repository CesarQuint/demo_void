import React from "react";
import Link from "next/link";
import styles from "../css/navBar.module.css";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <header>
      <section className={styles.nav_container}>
        <Link href={"/frammer_main"}>Home</Link>
        <Link href={"/frammer_2"}>Second</Link>
        <Link href={"/third_page"}>Third</Link>
      </section>
    </header>
  );
};

export default NavBar;
