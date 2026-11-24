"use client";

import { createContext, useCallback, useContext, useId, useRef, useState } from "react";

const CoverValueContext = createContext(0);
const CoverPublishContext = createContext<(source: string, value: number) => void>(() => {});

/**
 * Lets a nearby sidebar fade while wide media (scroll-shrink video, full-width
 * figures) passes beside it. Each piece of media reports on its own, and the
 * sidebar hides while any of them covers it.
 */
export function ScrollShrinkCoverProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sources = useRef(new Map<string, number>());
  const [cover, setCover] = useState(0);
  const publish = useCallback((source: string, value: number) => {
    if (value > 0) sources.current.set(source, value);
    else sources.current.delete(source);
    setCover(Math.max(0, ...sources.current.values()));
  }, []);
  return (
    <CoverPublishContext.Provider value={publish}>
      <CoverValueContext.Provider value={cover}>
        {children}
      </CoverValueContext.Provider>
    </CoverPublishContext.Provider>
  );
}

export function useScrollShrinkCover() {
  return useContext(CoverValueContext);
}

/** Returns this caller's own setter, so several media blocks don't overwrite each other. */
export function useScrollShrinkCoverSetter() {
  const publish = useContext(CoverPublishContext);
  const source = useId();
  return useCallback((value: number) => publish(source, value), [publish, source]);
}
