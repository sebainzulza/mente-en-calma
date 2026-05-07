import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { tips, getTipBySlug } from "@/lib/content/tips";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return tips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tip = getTipBySlug(slug);
  if (!tip) return {};
  return { title: `${tip.title} — mente-en-calma`, description: tip.summary };
}

export default async function TipPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tip = getTipBySlug(slug);
  if (!tip) notFound();

  return (
    <article className="space-y-6 max-w-2xl mx-auto">
      <Link
        href="/tips"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="w-4 h-4" /> Volver
      </Link>

      <header className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
          {tip.tag}
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight">{tip.title}</h1>
        <p className="text-[var(--muted-foreground)] text-lg">{tip.summary}</p>
      </header>

      <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none whitespace-pre-line leading-relaxed">
        {tip.body}
      </div>
    </article>
  );
}
