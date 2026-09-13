"use client";

import { createContext, useContext, useState } from "react";

const CoverValueContext = createContext(0);
const CoverSetterContext = createContext<(value: number) => void>(() => {});

/** Lets a nearby sidebar fade while scroll-shrink media is wider than the text column. */
export function ScrollShrinkCoverProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cover, setCover] = useState(0);
  return (
    <CoverSetterContext.Provider value={setCover}>
      <CoverValueContext.Provider value={cover}>
        {children}
      </CoverValueContext.Provider>
    </CoverSetterContext.Provider>
  );
}

export function useScrollShrinkCover() {
  return useContext(CoverValueContext);
}

export function useScrollShrinkCoverSetter() {
  return useContext(CoverSetterContext);
}
