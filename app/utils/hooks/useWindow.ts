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
    innerWidth: 0,
    innerHeight: 0,
    navigator: {
      language: "es",
      userAgent: "",
      platform: "",
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
  });

  return windowForReference.current;
}
