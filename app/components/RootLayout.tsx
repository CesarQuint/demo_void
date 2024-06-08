"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";

// Prevents instant page opening
function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

export default function Template({ children }: { children: React.ReactNode }) {
  let pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <FrozenRouter key={pathname}>{children}</FrozenRouter>
      </AnimatePresence>
    </>
  );
}
