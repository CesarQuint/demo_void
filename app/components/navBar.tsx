// NavBar.tsx
"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useNavigation } from "../utils/navigationContext";
import styles from "../css/navBar.module.css";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { setNavigationEvent } = useNavigation();
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <header>
      <section className={styles.nav_container}>
        <Link
          href={"/frammer_main"}
          onClick={(e) => {
            e.preventDefault();
            setNavigationEvent({ state: true, href: "/frammer_main" });
          }} // Set navigation event when link is clicked
        >
          Home
        </Link>
        <Link
          href={"/frammer_2"}
          onClick={(e) => {
            e.preventDefault();
            setNavigationEvent({ state: true, href: "/frammer_2" });
          }}
        >
          Second
        </Link>
        <Link
          href={"/third_page"}
          onClick={(e) => {
            e.preventDefault();
            setNavigationEvent({ state: true, href: "/third_page" });
          }}
        >
          Third
        </Link>
      </section>
    </header>
  );
};

export default NavBar;
