import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const apiKey = process.env.OPENROUTER_API_KEY;

export const openrouter = apiKey
  ? createOpenRouter({
      apiKey,
      appName: "mente-en-calma",
      appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    })
  : null;

// Modelo configurable por env. Por defecto un modelo gratuito de OpenRouter.
// Puedes cambiarlo sin tocar código: definí OPENROUTER_MODEL en .env.local.
export const CHAT_MODEL_ID =
  process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.3-8b-instruct:free";

export function getChatModel() {
  if (!openrouter) {
    throw new Error(
      "OPENROUTER_API_KEY no está configurada. Copia .env.example a .env.local y añade tu key.",
    );
  }
  return openrouter(CHAT_MODEL_ID);
}
