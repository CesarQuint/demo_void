import React from "react";
import Link from "next/link";
import styles from "../css/navBar.module.css";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className={styles.main}>
      <section className={styles.nav_container}>
        <Link href={"/"}>Home</Link>
        <Link href={"/first_project"}>Fist Demo</Link>
      </section>
    </div>
  );
};

export default NavBar;
