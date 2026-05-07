import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { getChatModel } from "@/lib/ai/openrouter";
import { SYSTEM_PROMPT, CRISIS_RESPONSE } from "@/lib/ai/system-prompt";
import { checkCrisis } from "@/lib/ai/crisis-detector";

export const runtime = "nodejs";
export const maxDuration = 30;

function extractTextFromUIMessage(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("\n");
}

export async function POST(req: Request) {
  let body: { messages: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const messages = body.messages ?? [];
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const lastUserText = lastUser ? extractTextFromUIMessage(lastUser) : "";

  // Capa 1: detector determinista de crisis. Si dispara, NO llamamos al modelo.
  // Devolvemos una respuesta fija con líneas de ayuda.
  const crisis = checkCrisis(lastUserText);
  if (crisis.level === "crisis") {
    return Response.json(
      {
        crisis: true,
        message: CRISIS_RESPONSE,
      },
      {
        status: 200,
        headers: {
          "x-crisis-detected": "true",
        },
      },
    );
  }

  // Caso normal: stream de la IA con el system prompt de seguridad.
  try {
    const model = getChatModel();
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      temperature: 0.7,
      maxRetries: 1,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido en el chat";
    return Response.json({ error: message }, { status: 500 });
  }
}
