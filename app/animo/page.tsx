"use client";

import { useState } from "react";
import { useLocalStorageJSON } from "@/lib/useLocalStorage";

const MOODS = [
  { emoji: "😞", label: "Muy mal", value: 1 },
  { emoji: "😕", label: "Mal", value: 2 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "🙂", label: "Bien", value: 4 },
  { emoji: "😄", label: "Muy bien", value: 5 },
];

type Entry = { value: number; emoji: string; note: string; date: string };

export default function AnimoPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useLocalStorageJSON<Entry[]>("animo", []);

  function save() {
    if (selected === null) return;
    const mood = MOODS.find((m) => m.value === selected)!;
    const entry: Entry = {
      value: selected,
      emoji: mood.emoji,
      note,
      date: new Date().toISOString(),
    };
    setEntries([entry, ...entries].slice(0, 60));
    setSelected(null);
    setNote("");
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold">Tu ánimo de hoy</h1>
        <p className="text-[var(--muted-foreground)]">
          Un registro rápido. Ver tendencias en el tiempo ayuda más de lo que parece.
        </p>
      </header>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          {MOODS.map((m) => (
            <button
              key={m.value}
              onClick={() => setSelected(m.value)}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-3 flex-1 transition-colors ${
                selected === m.value
                  ? "bg-[var(--primary)]/15 ring-2 ring-[var(--primary)]"
                  : "hover:bg-[var(--muted)]"
              }`}
            >
              <span className="text-3xl">{m.emoji}</span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {m.label}
              </span>
            </button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="(Opcional) ¿Qué pasó hoy?"
          rows={3}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 resize-none"
        />

        <button
          onClick={save}
          disabled={selected === null}
          className="rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] px-5 py-2.5 font-medium hover:opacity-90 disabled:opacity-40"
        >
          Guardar registro
        </button>
      </section>

      {entries.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-semibold">Últimos registros</h2>
          <ul className="space-y-2">
            {entries.slice(0, 14).map((e) => (
              <li
                key={e.date}
                className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-3"
              >
                <span className="text-2xl">{e.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {new Date(e.date).toLocaleString("es-CL", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  {e.note && <p className="text-sm mt-0.5">{e.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
