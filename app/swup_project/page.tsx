"use client";
import { useEffect, useState, useRef } from "react";
import Swup from "swup";
import styles from "../page.module.css";

const SwupProject: React.FC = () => {
  const swupRef = useRef<Swup | null>(null);
  const [pageData, setPageData] = useState({ content: "Initial Content" });

  useEffect(() => {
    // Initialize Swup instance
    const swup = new Swup({
      containers: ["#swup"], // Ensure this matches the ID of the main container
      animationSelector: '[class*="transition-"]', // Ensure this matches the class for transitions
    });
    swupRef.current = swup;

    // Cleanup on component unmount
    return () => {
      swupRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    const onTransitionComplete = (data: any) => {
      // Example logic to fetch new data or perform any side effect on page change
      setPageData({ content: "New Content from Transition" });
    };

    // Listen for transition complete event
    swupRef.current?.hooks.on("content:replace", onTransitionComplete);

    // Cleanup event listener
    return () => {
      swupRef.current?.hooks.off("content:replace", onTransitionComplete);
    };
  }, []);

  const navigateToPage = (path: string) => {
    swupRef.current?.navigate(path);
  };

  return (
    <main id="swup" className={`${styles.main} transition-fade`}>
      <div>
        <h1>Welcome SWUP</h1>
        <p>{pageData.content}</p>
        <section className={`${styles.cards_container}`}>
          <div
            onClick={() => navigateToPage("/swup_project_2")}
            className={styles.card}
          >
            Page 1
          </div>
          <div
            onClick={() => navigateToPage("/swup_project_3")}
            className={styles.card}
          >
            Page 2
          </div>
          <div
            onClick={() => navigateToPage("/swup_project_4")}
            className={styles.card}
          >
            Page 3
          </div>
        </section>
      </div>
    </main>
  );
};

export default SwupProject;
