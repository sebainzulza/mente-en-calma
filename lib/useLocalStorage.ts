"use client";

import { useCallback, useSyncExternalStore } from "react";

// Suscripción única a eventos `storage` de otras pestañas + un canal interno
// para esta misma pestaña (window.dispatchEvent del mismo evento).
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function emptySnapshot() {
  return null as string | null;
}

/**
 * Lee y escribe un valor JSON en localStorage de forma reactiva, compatible con SSR.
 * Devuelve el valor parseado y un setter que persiste y notifica a los oyentes.
 */
export function useLocalStorageJSON<T>(key: string, fallback: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    emptySnapshot,
  );

  let value: T = fallback;
  if (raw) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }

  const setValue = useCallback(
    (next: T) => {
      localStorage.setItem(key, JSON.stringify(next));
      // Notifica a otros useSyncExternalStore en la misma pestaña.
      window.dispatchEvent(new StorageEvent("storage", { key }));
    },
    [key],
  );

  return [value, setValue] as const;
}
