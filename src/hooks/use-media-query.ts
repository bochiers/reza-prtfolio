import { useSyncExternalStore } from "react";

/** Subscribe to a CSS media query. SSR-safe default is `false`. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

type NetworkInformation = { saveData?: boolean };

/** True when the user asked the browser to save data. */
export function prefersSaveData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return conn?.saveData === true;
}
