import { useState, useEffect, useRef } from "react";

export function useIntersectionObserver(rootMargin = "200px") {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { isIntersecting, ref };
}
