import Link from "next/link";
import { Heart, LifeBuoy } from "lucide-react";

const navItems = [
  { href: "/chat", label: "Chat" },
  { href: "/diario", label: "Diario" },
  { href: "/respiracion", label: "Respiración" },
  { href: "/animo", label: "Ánimo" },
  { href: "/tips", label: "Tips" },
];

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Heart className="w-5 h-5 text-[var(--primary)]" aria-hidden />
          <span>mente-en-calma</span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm text-[var(--muted-foreground)]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[var(--foreground)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/emergencia"
          className="flex items-center gap-1.5 text-sm font-medium text-[var(--danger)] hover:underline"
        >
          <LifeBuoy className="w-4 h-4" aria-hidden />
          Emergencia
        </Link>
      </div>
      <nav className="md:hidden flex items-center gap-4 px-4 pb-2 text-sm text-[var(--muted-foreground)] overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap hover:text-[var(--foreground)] transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
