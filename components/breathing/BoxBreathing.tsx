"use client";

import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const PHASES = [
  { label: "Inhala", seconds: 4 },
  { label: "Sostén", seconds: 4 },
  { label: "Exhala", seconds: 4 },
  { label: "Sostén", seconds: 4 },
];

export function BoxBreathing() {
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].seconds);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;
        // siguiente fase
        setPhaseIdx((idx) => {
          const next = (idx + 1) % PHASES.length;
          if (next === 0) setCycles((c) => c + 1);
          return next;
        });
        return PHASES[(phaseIdx + 1) % PHASES.length].seconds;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, phaseIdx]);

  function reset() {
    setRunning(false);
    setPhaseIdx(0);
    setSecondsLeft(PHASES[0].seconds);
    setCycles(0);
  }

  const phase = PHASES[phaseIdx];
  const scale = phase.label === "Inhala" ? 1.4 : phase.label === "Exhala" ? 0.8 : 1.1;

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative w-56 h-56 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full bg-[var(--primary)]/20 transition-transform ease-in-out"
          style={{
            transform: `scale(${running ? scale : 1})`,
            transitionDuration: "4000ms",
          }}
        />
        <div
          className="absolute inset-4 rounded-full bg-[var(--primary)]/30 transition-transform ease-in-out"
          style={{
            transform: `scale(${running ? scale : 1})`,
            transitionDuration: "4000ms",
          }}
        />
        <div className="relative text-center">
          <p className="text-2xl font-semibold">{running ? phase.label : "Listo/a"}</p>
          <p className="text-5xl font-mono mt-1">{running ? secondsLeft : "—"}</p>
        </div>
      </div>

      <p className="text-sm text-[var(--muted-foreground)]">
        Ciclos completados: <span className="font-semibold">{cycles}</span>
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] px-5 py-2.5 font-medium hover:opacity-90"
        >
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? "Pausar" : "Comenzar"}
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 font-medium hover:bg-[var(--muted)]"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </button>
      </div>
    </div>
  );
}
