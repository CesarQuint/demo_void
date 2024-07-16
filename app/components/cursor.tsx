import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import css from "../css/cursor.module.css";

gsap.registerPlugin(useGSAP);

interface CustomCursorProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const CustomCursor = ({ containerRef }: CustomCursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();

  const onMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      // Ensure the cursor stays within the container's boundaries
      if (
        x >= 0 &&
        x <= containerRect.width &&
        y >= 0 &&
        y <= containerRect.height
      ) {
        setPosition({ x, y });
      }
    }
  };

  const onMouseEnter = contextSafe(() => {
    gsap.to([cursorRingRef.current, cursorDotRef.current], {
      opacity: 1,
      duration: 0.3,
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to([cursorRingRef.current, cursorDotRef.current], {
      opacity: 0,
      duration: 0.3,
    });
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", onMouseMove);
      containerRef.current.addEventListener("mouseenter", onMouseEnter);
      containerRef.current.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", onMouseMove);
        containerRef.current.removeEventListener("mouseenter", onMouseEnter);
        containerRef.current.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [containerRef]);

  useEffect(() => {
    if (cursorRingRef.current && cursorDotRef.current) {
      cursorRingRef.current.style.left = `${position.x}px`;
      cursorRingRef.current.style.top = `${position.y}px`;
      cursorDotRef.current.style.left = `${position.x}px`;
      cursorDotRef.current.style.top = `${position.y}px`;
    }
  }, [position]);

  return (
    <>
      <div
        ref={cursorRingRef}
        className={css.cursor_ring}
        style={{ opacity: 0 }}></div>
      <div
        ref={cursorDotRef}
        className={css.cursor_dot}
        style={{ opacity: 0 }}></div>
    </>
  );
};
