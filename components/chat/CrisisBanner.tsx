import Link from "next/link";
import { LifeBuoy, Phone } from "lucide-react";

export function CrisisBanner() {
  return (
    <div className="rounded-xl border-2 border-[var(--danger)]/40 bg-[var(--danger)]/5 p-5 sm:p-6 space-y-4">
      <div className="flex items-start gap-3">
        <LifeBuoy className="w-6 h-6 text-[var(--danger)] shrink-0 mt-0.5" aria-hidden />
        <div className="space-y-2">
          <h2 className="font-semibold text-[var(--danger)]">
            Quiero que estés a salvo
          </h2>
          <p className="text-sm leading-relaxed">
            Lo que me cuentas es muy fuerte y no deberías atravesarlo solo/a.
            Por favor contacta ahora con alguien que pueda acompañarte de verdad.
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        <a
          href="tel:*4141"
          className="flex items-center justify-between gap-3 rounded-lg bg-[var(--card)] border border-[var(--danger)]/30 px-4 py-3 hover:bg-[var(--danger)]/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[var(--danger)]" aria-hidden />
            <div>
              <p className="font-medium text-sm">Prevención del Suicidio</p>
              <p className="text-xs text-[var(--muted-foreground)]">Gratis, 24/7</p>
            </div>
          </div>
          <span className="font-mono font-semibold text-[var(--danger)]">*4141</span>
        </a>
        <a
          href="tel:131"
          className="flex items-center justify-between gap-3 rounded-lg bg-[var(--card)] border border-[var(--danger)]/30 px-4 py-3 hover:bg-[var(--danger)]/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[var(--danger)]" aria-hidden />
            <div>
              <p className="font-medium text-sm">SAMU — Emergencias</p>
              <p className="text-xs text-[var(--muted-foreground)]">Si estás en peligro inmediato</p>
            </div>
          </div>
          <span className="font-mono font-semibold text-[var(--danger)]">131</span>
        </a>
        <a
          href="tel:6003607777"
          className="flex items-center justify-between gap-3 rounded-lg bg-[var(--card)] border border-[var(--danger)]/30 px-4 py-3 hover:bg-[var(--danger)]/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[var(--danger)]" aria-hidden />
            <div>
              <p className="font-medium text-sm">Salud Responde</p>
              <p className="text-xs text-[var(--muted-foreground)]">Orientación en salud mental</p>
            </div>
          </div>
          <span className="font-mono font-semibold text-[var(--danger)]">600 360 7777</span>
        </a>
      </div>

      <Link
        href="/emergencia"
        className="block text-center text-sm text-[var(--danger)] hover:underline pt-1"
      >
        Ver más recursos →
      </Link>
    </div>
  );
}
