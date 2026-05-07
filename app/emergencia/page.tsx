import { Phone, MessageSquare, Globe } from "lucide-react";

const lineas = [
  {
    nombre: "Línea de Prevención del Suicidio",
    detalle: "Atención telefónica gratuita, 24/7, en Chile.",
    contacto: "*4141",
    href: "tel:*4141",
    icon: Phone,
    destacar: true,
  },
  {
    nombre: "SAMU — Emergencias médicas",
    detalle: "Para emergencias inmediatas.",
    contacto: "131",
    href: "tel:131",
    icon: Phone,
    destacar: true,
  },
  {
    nombre: "Salud Responde",
    detalle: "Orientación en salud, incluida salud mental, 24/7.",
    contacto: "600 360 7777",
    href: "tel:6003607777",
    icon: Phone,
  },
  {
    nombre: "Fono Drogas y Alcohol (SENDA)",
    detalle: "Orientación y apoyo confidencial.",
    contacto: "1412",
    href: "tel:1412",
    icon: Phone,
  },
  {
    nombre: "Fono Niños (Defensoría de la Niñez)",
    detalle: "Para niños, niñas y adolescentes.",
    contacto: "147",
    href: "tel:147",
    icon: Phone,
  },
  {
    nombre: "Fono Familia (Carabineros)",
    detalle: "Apoyo en situaciones de violencia intrafamiliar.",
    contacto: "149",
    href: "tel:149",
    icon: Phone,
  },
  {
    nombre: "Hospital Digital — Salud Mental",
    detalle: "Recursos en línea del Ministerio de Salud.",
    contacto: "hospitaldigital.gob.cl",
    href: "https://hospitaldigital.gob.cl",
    icon: Globe,
  },
];

export default function EmergenciaPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold">Líneas de ayuda</h1>
        <p className="text-[var(--muted-foreground)] text-lg">
          Si estás en una crisis, no estás solo/a. Contactar a un humano puede
          ayudarte ahora mismo. Estas líneas son gratuitas y confidenciales.
        </p>
      </header>

      <section className="grid gap-3">
        {lineas.map(({ nombre, detalle, contacto, href, icon: Icon, destacar }) => (
          <a
            key={nombre}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`flex items-start gap-4 rounded-xl border p-4 transition-colors ${
              destacar
                ? "border-[var(--danger)]/40 bg-[var(--danger)]/5 hover:bg-[var(--danger)]/10"
                : "border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]/50"
            }`}
          >
            <Icon
              className={`w-6 h-6 mt-0.5 shrink-0 ${
                destacar ? "text-[var(--danger)]" : "text-[var(--primary)]"
              }`}
              aria-hidden
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold">{nombre}</p>
              <p className="text-sm text-[var(--muted-foreground)]">{detalle}</p>
            </div>
            <span
              className={`text-lg font-mono font-semibold whitespace-nowrap ${
                destacar ? "text-[var(--danger)]" : "text-[var(--foreground)]"
              }`}
            >
              {contacto}
            </span>
          </a>
        ))}
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 p-5 text-sm leading-relaxed space-y-2">
        <p className="font-medium text-[var(--foreground)] flex items-center gap-2">
          <MessageSquare className="w-4 h-4" aria-hidden />
          Si te cuesta hablar
        </p>
        <p className="text-[var(--muted-foreground)]">
          Está bien. Puedes empezar diciendo solamente: <em>&ldquo;no sé qué decir, pero necesito ayuda&rdquo;</em>.
          Quien atienda te va a guiar.
        </p>
      </section>
    </div>
  );
}
