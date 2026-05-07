"use client";

import { useState } from "react";
import { Trash2, Save } from "lucide-react";

export default function DiarioPage() {
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);

  function handleClear() {
    setContent("");
    setSaved(false);
  }

  function handleSave() {
    // Por ahora, guarda en localStorage. Cuando esté Supabase conectado,
    // si el usuario tiene cuenta, se sincroniza al servidor.
    if (!content.trim()) return;
    const entries = JSON.parse(localStorage.getItem("diario") ?? "[]");
    entries.unshift({
      content,
      date: new Date().toISOString(),
    });
    localStorage.setItem("diario", JSON.stringify(entries));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold">Diario</h1>
        <p className="text-[var(--muted-foreground)]">
          Escribe lo que sientes. Lo que escribes acá no se envía a ningún lado a
          menos que lo guardes. Si lo borras, desaparece.
        </p>
      </header>

      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setSaved(false);
        }}
        placeholder="Hoy me siento…"
        className="w-full min-h-[40vh] rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 resize-y"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleSave}
          disabled={!content.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] px-5 py-2.5 font-medium hover:opacity-90 disabled:opacity-40"
        >
          <Save className="w-4 h-4" />
          Guardar (en este dispositivo)
        </button>
        <button
          onClick={handleClear}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 font-medium hover:bg-[var(--muted)]"
        >
          <Trash2 className="w-4 h-4" />
          Soltar y olvidar
        </button>
        {saved && (
          <span className="text-sm text-[var(--accent)]">Guardado ✓</span>
        )}
      </div>

      <p className="text-xs text-[var(--muted-foreground)]">
        Aún no hay sincronización en la nube. Si limpias tu navegador, las entradas
        guardadas se pierden. Pronto podrás crear cuenta para conservarlas.
      </p>
    </div>
  );
}
