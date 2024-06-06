"use client";

import { useRef, useEffect } from "react";
import Swup from "swup";
import gsap from "gsap";
import styles from "../page.module.css";

const SwupProject: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Swup
    const swup = new Swup({
      containers: ["#swup"], // Ensure this matches the ID of the main container
      animationSelector: '[class*="transition-"]', // Ensure this matches the class for transitions
    });

    // GSAP context for animations
    const context = gsap.context(() => {
      // Initial animation on mount
      gsap.fromTo(content.current, { opacity: 0 }, { opacity: 1, duration: 1 });

      // Handle content replaced by Swup
      const handleContentReplaced = () => {
        gsap.fromTo(
          content.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 }
        );
      };

      document.addEventListener("swup:contentReplaced", handleContentReplaced);

      // Cleanup function
      return () => {
        document.removeEventListener(
          "swup:contentReplaced",
          handleContentReplaced
        );
      };
    }, container);

    // Cleanup on component unmount
    return () => {
      swup.destroy(); // Destroy Swup instance
      context.revert(); // Clean up GSAP context
    };
  }, []);

  return (
    <main
      id="swup"
      className={`${styles.main} transition-fade`}
      ref={container}
    >
      <div ref={content}>
        <h1>Welcome SWUP</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </main>
  );
};

export default SwupProject;
