import { BoxBreathing } from "@/components/breathing/BoxBreathing";

export const metadata = {
  title: "Respiración — mente-en-calma",
};

export default function RespiracionPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold">Respiración guiada</h1>
        <p className="text-[var(--muted-foreground)]">
          Cuatro segundos inhalas, cuatro sostienes, cuatro exhalas, cuatro sostienes.
          Tu sistema nervioso te lo va a agradecer.
        </p>
      </header>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-8">
        <BoxBreathing />
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/40 p-5 text-sm text-[var(--muted-foreground)] leading-relaxed space-y-2">
        <p className="font-medium text-[var(--foreground)]">¿Cómo se hace?</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Siéntate cómoda/o, con la espalda recta pero relajada.</li>
          <li>Inhala por la nariz contando hasta 4.</li>
          <li>Sostén el aire 4 segundos.</li>
          <li>Exhala por la boca contando hasta 4.</li>
          <li>Sostén con los pulmones vacíos 4 segundos.</li>
          <li>Repite 4-6 veces. Si te mareas, vuelve a tu respiración normal.</li>
        </ol>
      </section>
    </div>
  );
}
