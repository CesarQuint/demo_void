// NavigationContext.tsx
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

interface NavigationContextProps {
  navigationEvent: { state: boolean; href: string };
  setNavigationEvent: (event: { state: boolean; href: string }) => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [navigationEvent, setNavigationEvent] = useState({
    state: true,
    href: "",
  });

  useEffect(() => {
    console.log("Clicked");
    console.log(navigationEvent);
  }, [navigationEvent]);

  return (
    <NavigationContext.Provider value={{ navigationEvent, setNavigationEvent }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextProps => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
