import Link from "next/link";
import { MessageCircle, BookOpen, Wind, LineChart, Lightbulb, LifeBuoy } from "lucide-react";

const sections = [
  {
    href: "/chat",
    icon: MessageCircle,
    title: "Conversa",
    description: "Habla con un acompañante con IA cuando lo necesites. Te escucha sin juzgar.",
  },
  {
    href: "/diario",
    icon: BookOpen,
    title: "Diario",
    description: "Escribe lo que sientes. Puedes guardarlo o soltarlo y olvidarlo.",
  },
  {
    href: "/respiracion",
    icon: Wind,
    title: "Respiración",
    description: "Ejercicios guiados para calmar la ansiedad en pocos minutos.",
  },
  {
    href: "/animo",
    icon: LineChart,
    title: "Ánimo",
    description: "Registra cómo te sientes hoy y observa tu tendencia.",
  },
  {
    href: "/tips",
    icon: Lightbulb,
    title: "Tips",
    description: "Lecturas cortas sobre estrés, sueño, autoestima y más.",
  },
  {
    href: "/emergencia",
    icon: LifeBuoy,
    title: "Emergencia",
    description: "Líneas de ayuda en Chile. Disponibles 24/7.",
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="text-center space-y-4 py-6 sm:py-12">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
          Un espacio para respirar.
        </h1>
        <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
          mente-en-calma te acompaña con conversación, ejercicios y herramientas
          de autocuidado. Cuando lo necesites, donde estés.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] px-5 py-2.5 font-medium hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-4 h-4" aria-hidden />
            Empezar a conversar
          </Link>
          <Link
            href="/respiracion"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 font-medium hover:bg-[var(--muted)] transition-colors"
          >
            <Wind className="w-4 h-4" aria-hidden />
            Respirar 1 minuto
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ href, icon: Icon, title, description }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-[var(--primary)] transition-colors"
          >
            <Icon className="w-6 h-6 text-[var(--primary)] mb-3" aria-hidden />
            <h2 className="font-semibold mb-1">{title}</h2>
            <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 p-6 text-sm text-[var(--muted-foreground)] leading-relaxed">
        <p className="mb-2 font-medium text-[var(--foreground)]">Importante</p>
        <p>
          Esta plataforma <strong>no reemplaza</strong> a un profesional de salud mental.
          Es una herramienta de acompañamiento. Si estás pensando en hacerte daño o
          tienes pensamientos de suicidio, por favor llama ahora al <strong>*4141</strong>{" "}
          (línea de prevención del suicidio) o al <strong>131</strong> (SAMU). No estás
          solo/a.
        </p>
      </section>
    </div>
  );
}
