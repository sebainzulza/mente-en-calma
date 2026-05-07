import Link from "next/link";
import { tips } from "@/lib/content/tips";

export const metadata = {
  title: "Tips — mente-en-calma",
};

export default function TipsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold">Tips y lecturas cortas</h1>
        <p className="text-[var(--muted-foreground)]">
          Sin gurús, sin frases motivacionales. Cosas que de verdad ayudan.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {tips.map((tip) => (
          <li key={tip.slug}>
            <Link
              href={`/tips/${tip.slug}`}
              className="block rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-[var(--primary)] transition-colors h-full"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                {tip.tag}
              </span>
              <h2 className="font-semibold mt-1 mb-1">{tip.title}</h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                {tip.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
