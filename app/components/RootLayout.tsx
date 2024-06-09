"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, usePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import NavBar from "./navBar";

export default function Template({ children }: { children: React.ReactNode }) {
  let pathname = usePathname();

  return (
    <>
      <NavBar />
      <AnimatePresence mode="wait">
        <div key={pathname}> {children}</div>
      </AnimatePresence>
    </>
  );
}
