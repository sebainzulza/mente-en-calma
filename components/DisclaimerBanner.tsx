import Link from "next/link";

export function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-100 text-xs sm:text-sm px-4 py-2 text-center">
      mente-en-calma es un acompañamiento, <strong>no reemplaza atención psicológica profesional</strong>. Si estás en crisis, llama al{" "}
      <Link href="/emergencia" className="underline font-semibold">
        *4141 o 131
      </Link>
      .
    </div>
  );
}
