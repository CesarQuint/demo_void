import { useEffect, useState, useRef } from "react";

interface Window {
  innerWidth: number;
  innerHeight: number;
  navigator: {
    language: string;
    userAgent: string;
    platform: string;
  };
}

export default function useWindow(): Readonly<Window> {
  const windowForReference = useRef<Window>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    navigator: {
      language: window.navigator.language,
      userAgent: window.navigator.userAgent,
      platform: window.navigator.platform,
    },
  });

  useEffect(() => {
    const updateWindow = () => {
      windowForReference.current.innerHeight = window.innerHeight;
      windowForReference.current.innerWidth = window.innerHeight;
      windowForReference.current.navigator.language = window.navigator.language;
      windowForReference.current.navigator.userAgent =
        window.navigator.userAgent;
      windowForReference.current.navigator.platform =
        window.navigator.platform || "";
    };

    window.addEventListener("resize", updateWindow);

    return () => window.removeEventListener("resize", updateWindow);
  }, []);

  return windowForReference.current;
}
