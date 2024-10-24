"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

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
    const pathname = usePathname();
    const router = useRouter(); // Access the router
    const [navigationEvent, setNavigationEvent] = useState({
        state: true,
        href: pathname,
    });

    // Listen for popstate (back/forward navigation events)
    useEffect(() => {
        const handlePopState = () => {
            const currentPath = window.location.pathname;
            setNavigationEvent({ state: true, href: currentPath });
        };
        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    useEffect(() => {
        // Ensure that we set the current pathname when navigating manually
        setNavigationEvent({ state: true, href: pathname });
    }, [pathname]);

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
            "useNavigation must be used within a NavigationProvider"
        );
    }
    return context;
};
