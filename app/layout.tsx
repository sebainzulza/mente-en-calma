import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mente-en-calma — acompañamiento emocional",
  description:
    "Espacio de apoyo emocional con IA, diario, ejercicios de respiración y tips. No reemplaza atención psicológica profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DisclaimerBanner />
        <Header />
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 sm:py-10">
          {children}
        </main>
        <footer className="border-t border-[var(--border)] bg-[var(--card)] py-4 text-center text-xs text-[var(--muted-foreground)]">
          Hecho con cuidado. En crisis: *4141 (prevención del suicidio) · 131 (SAMU) · 600 360 7777 (Salud Responde).
        </footer>
      </body>
    </html>
  );
}
