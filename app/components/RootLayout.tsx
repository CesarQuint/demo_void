"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import NavBar from "./navBar";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            <NavBar />
            <AnimatePresence mode="wait">{children}</AnimatePresence>
        </>
    );
}
