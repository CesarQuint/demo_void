"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavigationContextProps {
    navigationEvent: { state: boolean; href: string };
    setNavigationEvent: (event: { state: boolean; href: string }) => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
    undefined,
);

export const NavigationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();
    const [navigationEvent, setNavigationEvent] = useState({
        state: true,
        href: pathname,
    });

    useEffect(() => {}, [navigationEvent]);

    return (
        <NavigationContext.Provider
            value={{ navigationEvent, setNavigationEvent }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = (): NavigationContextProps => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error(
            "useNavigation must be used within a NavigationProvider",
        );
    }
    return context;
};
