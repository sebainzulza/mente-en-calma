# mente-en-calma

PWA de acompañamiento emocional con IA, en español. Incluye chat con detección de crisis, diario, ejercicios de respiración guiada, registro de ánimo y artículos de psicoeducación.

> **Importante**: este proyecto **no reemplaza** a un profesional de salud mental. Es una herramienta de acompañamiento. Si estás en crisis, llama al **\*4141** (línea de prevención del suicidio en Chile) o al **131** (SAMU).

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind v4
- **Vercel AI SDK v6** con provider de **OpenRouter** (modelo gratis configurable)
- **Supabase** para auth y base de datos (Row Level Security)
- Componentes propios + Lucide icons
- Despliegue en **Vercel**

## Setup local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Copiar el archivo de ejemplo y rellenar:
   ```bash
   cp .env.example .env.local
   ```
   - `OPENROUTER_API_KEY`: crea una key gratuita en [openrouter.ai](https://openrouter.ai/).
   - `OPENROUTER_MODEL` (opcional): por defecto `meta-llama/llama-3.3-8b-instruct:free`.
   - Supabase: crea un proyecto en [supabase.com](https://supabase.com/) y aplica `supabase/migrations/0001_init.sql` desde el SQL editor (mientras no haya backend, la app funciona en modo anónimo + localStorage).

3. Levantar dev server:
   ```bash
   npm run dev
   ```

## Estructura

```
app/
  page.tsx               Landing
  chat/                  Chat IA con guardrails
  diario/                Diario / desahogo
  respiracion/           Ejercicios guiados (box breathing)
  animo/                 Mood tracker
  tips/                  Lecturas cortas
  emergencia/            Líneas de ayuda (siempre accesible)
  api/chat/route.ts      Endpoint del chat (streaming + crisis check)
components/
  Header.tsx
  DisclaimerBanner.tsx   Banner persistente "no reemplaza terapia"
  chat/                  ChatWindow + CrisisBanner
  breathing/             Animaciones de respiración
lib/
  ai/
    system-prompt.ts     Comportamiento del modelo (archivo crítico)
    crisis-detector.ts   Detección determinista de señales de riesgo
    openrouter.ts        Provider config
  supabase/              Clientes browser + server (SSR)
  content/tips.ts        Artículos
supabase/migrations/     Schema con RLS estricta
```

## Protocolo de crisis

El chat incluye dos capas de seguridad:

1. **Capa 1 (regex determinista)** en `lib/ai/crisis-detector.ts`. Se ejecuta en cliente y servidor. Si detecta señales de ideación suicida, autolesión o despedida, se reemplaza la conversación por un banner con líneas de ayuda chilenas. El modelo **no es invocado** en este caso.
2. **Capa 2 (clasificador IA)**: pendiente. Se añadirá para casos ambiguos.

El `SYSTEM_PROMPT` en `lib/ai/system-prompt.ts` instruye al modelo a no diagnosticar, no recomendar medicamentos y derivar a profesional ante temas serios.

**Filosofía**: preferir falsos positivos a falsos negativos. El costo de mostrar líneas de ayuda de más es bajo; el de no mostrarlas cuando hace falta puede ser muy alto.

## Roadmap (post-MVP)

- Capa 2 de detección con clasificador IA.
- Auth de Supabase (anónima + email/password).
- Sincronización de diario y mood en la nube.
- Contacto de confianza opt-in (Resend para email).
- PWA installable con next-pwa.
- Tests automatizados de detección de crisis.

## Licencia

MIT — pero por favor, si vas a forkearlo para uso real, mantén o mejora el protocolo de crisis. Vidas pueden depender de eso.
