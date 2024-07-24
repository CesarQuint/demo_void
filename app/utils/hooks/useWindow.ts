import { useEffect, useState } from "react";

interface WindowProps {
  innerWidth: number;
  innerHeight: number;
  navigator: {
    language: string;
    userAgent: string;
    platform: string;
  };
}

export default function useWindow(): Readonly<WindowProps> {
  const [windowProps, setWindowProps] = useState<WindowProps>({
    innerWidth: 0,
    innerHeight: 0,
    navigator: {
      language: "",
      userAgent: "",
      platform: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWindow = () => {
        setWindowProps({
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          navigator: {
            language: window.navigator.language,
            userAgent: window.navigator.userAgent,
            platform: window.navigator.platform,
          },
        });
      };

      updateWindow();

      window.addEventListener("resize", updateWindow);
      return () => window.removeEventListener("resize", updateWindow);
    }
  }, []);

  return windowProps;
}
