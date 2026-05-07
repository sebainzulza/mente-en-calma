// Cliente Supabase para componentes client-side. Se conectará cuando configures
// NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local.
//
// Por ahora exportamos un helper que devuelve null si no hay env, así las páginas
// pueden funcionar en modo "anónimo + localStorage" mientras no haya backend.

import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createBrowserClient(url, anon);
}
