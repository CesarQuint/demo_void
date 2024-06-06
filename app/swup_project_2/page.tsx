//! This Component use only swup

"use client";
import { useEffect } from "react";
import Swup from "swup";
import styles from "../page.module.css";

export default function SwupProject2() {
  useEffect(() => {
    const swup = new Swup({
      containers: ["#swup"], // Ensure this matches the ID of the main container
      animationSelector: '[class*="transition-"]', // Ensure this matches the class for transitions
    });

    return () => {
      swup.destroy(); // Clean up the Swup instance when the component unmounts
    };
  }, []);

  return (
    <main id="swup" className={`${styles.main} transition-fade`}>
      <h1>SWUP 2s</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </main>
  );
}
