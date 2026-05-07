// Detector de señales de crisis. Capa 1: regex deterministas en español chileno.
// La capa 2 (clasificador IA) se añadirá en una siguiente iteración.
//
// Filosofía: preferir falsos positivos a falsos negativos. Si hay duda,
// activamos el banner de crisis. El costo de un falso positivo es bajo
// (mostrar líneas de ayuda); el costo de un falso negativo puede ser muy alto.

const CRISIS_PATTERNS: RegExp[] = [
  // Ideación suicida directa
  /\bme\s+quiero\s+(?:matar|suicidar|morir)\b/i,
  /\bquiero\s+(?:matarme|suicidarme|morirme?|desaparecer)\b/i,
  /\bvoy\s+a\s+(?:matarme|suicidarme|terminar\s+con\s+todo|acabar\s+con\s+todo)\b/i,
  /\bpienso\s+en\s+(?:suicid|matarme|quitarme\s+la\s+vida)/i,
  /\bquitarme\s+la\s+vida\b/i,
  /\bya\s+no\s+quiero\s+(?:vivir|seguir|estar)\b/i,
  /\bno\s+quiero\s+(?:vivir|seguir\s+viviendo|seguir\s+aqu[íi]|despertar)\b/i,
  /\bmejor\s+no\s+(?:estar|existir|haber\s+nacido)\b/i,
  /\bser[íi]a\s+mejor\s+(?:morir|no\s+estar|desaparecer)\b/i,

  // Planificación
  /\b(?:plan|forma|manera)\s+de\s+(?:matarme|suicidarme|morir)\b/i,
  /\bcu[áa]ntas?\s+pastillas\b/i,
  /\bcomo\s+(?:matarme|suicidarme|ahorcarme)\b/i,
  /\bahorcarme\b/i,
  /\bcortarme\s+(?:las\s+venas|la\s+vena|profundo)\b/i,
  /\bsaltar\s+(?:del|de\s+un)\s+(?:edificio|puente|piso)\b/i,

  // Autolesión
  /\bme\s+corto\b/i,
  /\bme\s+he\s+(?:cortado|hecho\s+da[ñn]o|lastimado)\b/i,
  /\bquiero\s+hacerme\s+da[ñn]o\b/i,
  /\bautolesion/i,

  // Despedidas
  /\bes(?:ta)?\s+(?:es\s+)?mi\s+(?:[úu]ltim[ao]|despedida)\b/i,
  /\bme\s+despido\s+de\s+(?:todos|ti|la\s+vida)\b/i,

  // Slang chileno
  /\bme\s+las\s+voy\s+a\s+pegar\b/i,
  /\bya\s+fome\s+(?:la\s+)?vida\b/i,
];

// Patrones que típicamente son figurados — si SOLO aparecen estos, no es crisis.
// Los detectamos para reducir falsos positivos en mensajes ambiguos.
const FIGURATIVE_PATTERNS: RegExp[] = [
  /\bmuerto\s+de\s+(?:cansancio|risa|hambre|sue[ñn]o|aburrimiento)\b/i,
  /\bme\s+quiero\s+matar\s+estudiando\b/i,
  /\bme\s+mato\s+(?:estudiando|trabajando|haciendo)\b/i,
];

export type CrisisLevel = "ok" | "concern" | "crisis";

export interface CrisisCheckResult {
  level: CrisisLevel;
  matchedPattern?: string;
}

/**
 * Capa 1 (rápida, determinista). Devuelve "crisis" si detecta señales claras.
 * En el futuro se combinará con un clasificador IA para casos ambiguos.
 */
export function checkCrisis(message: string): CrisisCheckResult {
  if (!message || message.trim().length === 0) {
    return { level: "ok" };
  }

  const normalized = message.toLowerCase();

  // Si solo coincide con patrones figurados y NO con patrones de crisis, es ok.
  const hasFigurative = FIGURATIVE_PATTERNS.some((p) => p.test(normalized));
  const crisisMatch = CRISIS_PATTERNS.find((p) => p.test(normalized));

  if (crisisMatch) {
    // Pero si también hay patrón figurado claro y NO hay otro patrón fuerte, ser cauto.
    // Por seguridad, si hay match de crisis lo tratamos como crisis.
    return { level: "crisis", matchedPattern: crisisMatch.source };
  }

  if (hasFigurative) {
    return { level: "ok" };
  }

  // Heurística suave: señales de malestar fuerte sin ideación clara.
  const concernPatterns = [
    /\bno\s+puedo\s+m[áa]s\b/i,
    /\bestoy\s+(?:destrozad|hundid|en\s+el\s+suelo|muy\s+mal)/i,
    /\btoco\s+fondo\b/i,
    /\bme\s+siento\s+(?:vac[íi]o|sin\s+sentido|in[úu]til|una\s+carga)/i,
  ];
  const concernMatch = concernPatterns.find((p) => p.test(normalized));
  if (concernMatch) {
    return { level: "concern", matchedPattern: concernMatch.source };
  }

  return { level: "ok" };
}
