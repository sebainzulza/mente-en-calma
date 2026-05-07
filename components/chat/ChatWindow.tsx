"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { CrisisBanner } from "./CrisisBanner";
import { checkCrisis } from "@/lib/ai/crisis-detector";

const WELCOME =
  "Hola. Este es un espacio para que respires y compartas lo que necesites. Te escucho. ¿Qué te gustaría contarme hoy?";

export function ChatWindow() {
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState("");
  const [crisisActive, setCrisisActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, crisisActive]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || status === "streaming" || status === "submitted") return;

    // Capa 1 (cliente): si detectamos crisis, NO mandamos al modelo.
    // El backend también lo verifica como red de seguridad.
    const crisis = checkCrisis(text);
    if (crisis.level === "crisis") {
      setCrisisActive(true);
      setInput("");
      return;
    }

    sendMessage({ text });
    setInput("");
  }

  const isBusy = status === "streaming" || status === "submitted";

  return (
    <div className="flex flex-col h-[calc(100dvh-12rem)] sm:h-[calc(100dvh-14rem)] rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        <Message role="assistant" text={WELCOME} />

        {messages.map((m) => {
          const text = m.parts
            .filter((p) => p.type === "text")
            .map((p) => (p as { text: string }).text)
            .join("\n");
          if (!text) return null;
          return <Message key={m.id} role={m.role} text={text} />;
        })}

        {crisisActive && (
          <div className="pt-2">
            <CrisisBanner />
          </div>
        )}

        {error && !crisisActive && (
          <div className="text-sm text-[var(--danger)] bg-[var(--danger)]/10 border border-[var(--danger)]/30 rounded-lg p-3">
            Hubo un problema enviando el mensaje. {error.message}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-[var(--border)] bg-[var(--card)] p-3"
      >
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder={
              crisisActive
                ? "Por ahora, mejor llama a una de las líneas de ayuda."
                : "Escribe lo que estás sintiendo…"
            }
            rows={1}
            disabled={crisisActive}
            className="flex-1 resize-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isBusy || crisisActive || !input.trim()}
            className="rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] p-2.5 hover:opacity-90 disabled:opacity-40 transition-opacity"
            aria-label="Enviar"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mt-2">
          {isBusy
            ? "Pensando…"
            : "Recuerda: esto es un acompañamiento, no terapia. En crisis: *4141 o 131."}
        </p>
      </form>
    </div>
  );
}

function Message({ role, text }: { role: string; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-[var(--primary)] text-[var(--primary-foreground)] rounded-br-sm"
            : "bg-[var(--muted)] text-[var(--foreground)] rounded-bl-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
