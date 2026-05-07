export type Tip = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  tag: string;
};

export const tips: Tip[] = [
  {
    slug: "cuando-buscar-ayuda",
    tag: "Importante",
    title: "Cuándo es momento de buscar a un profesional",
    summary:
      "Una guía simple para reconocer las señales de que conviene pedir ayuda formal.",
    body: `Buscar ayuda no es signo de debilidad: es signo de que te tomas en serio. Algunas señales claras:

- El malestar dura más de dos semanas y no afloja.
- Te cuesta dormir, comer o concentrarte de forma persistente.
- Has dejado de hacer cosas que antes disfrutabas.
- Aparecen pensamientos sobre hacerte daño o no querer estar.
- Sientes que pierdes el control, te aíslas, o consumes más alcohol/sustancias.

En Chile puedes empezar por:

- Tu CESFAM (atención primaria), donde derivan a salud mental gratis.
- *4141 si la urgencia es ahora.
- Universidades suelen ofrecer atención psicológica gratuita a sus estudiantes.

Pedir ayuda no significa que estés "loco/a". Significa que mereces estar mejor.`,
  },
  {
    slug: "ansiedad-que-es",
    tag: "Ansiedad",
    title: "La ansiedad no es tu enemiga",
    summary:
      "Entender qué es y para qué sirve ayuda a no asustarse cuando aparece.",
    body: `La ansiedad es una respuesta normal de tu cuerpo a algo que percibe como amenaza. El problema no es sentirla; es cuando se queda demasiado tiempo o aparece sin motivo claro.

Lo que ayuda en el momento:

- Reconócela: "esto es ansiedad, va a pasar".
- Respira más lento (mira la sección de respiración).
- Mueve el cuerpo aunque sea 5 minutos.
- Nombra lo que ves, escuchas y tocas (técnica de grounding 5-4-3-2-1).

Lo que no ayuda:

- Pelearle ("no me puede estar pasando").
- Anticipar todos los escenarios catastróficos.
- Buscar reaseguros constantes en otras personas.

Si la ansiedad te impide vivir, buscar terapia ayuda mucho. Hay tratamiento.`,
  },
  {
    slug: "sueno-basico",
    tag: "Sueño",
    title: "Higiene del sueño básica (sin frases vacías)",
    summary:
      "Lo mínimo para empezar a dormir mejor sin convertirlo en otro proyecto estresante.",
    body: `Dormir mal te hace sentir peor casi en cualquier dimensión. Cosas concretas que sí mueven la aguja:

- Levántate a la misma hora todos los días, incluso fines de semana. Es el ancla.
- Sin pantallas brillantes los últimos 30 minutos antes de dormir.
- Si llevas 20 minutos sin poder dormir, levántate, haz algo aburrido y vuelve.
- Café solo antes de las 14:00. La cafeína dura horas.
- La cama es para dormir y nada más (ni Netflix ni redes sociales).

Si llevas semanas sin dormir bien y nada funciona, no normalices: háblalo con tu médico.`,
  },
  {
    slug: "autoestima-conversaciones",
    tag: "Autoestima",
    title: "Cómo te hablas tú",
    summary:
      "La voz interna importa. Cambiarla es difícil pero posible.",
    body: `¿Te dirías a un amigo lo que te dices a ti? Probablemente no. Notar la voz crítica interna ya es la mitad del trabajo.

Un ejercicio sencillo:

1. Cuando te pilles diciéndote algo duro ("soy un idiota", "no sirvo"), escríbelo tal cual.
2. Pregúntate: ¿le diría esto a alguien que quiero?
3. Reformúlalo como se lo dirías a esa persona.

No se trata de mentirte ("¡soy lo mejor!"), sino de hablarte con la misma justicia con que le hablas a otros.

Esto se entrena. La voz crítica no desaparece, pero deja de tener el control.`,
  },
  {
    slug: "5-4-3-2-1",
    tag: "Ejercicio",
    title: "Grounding 5-4-3-2-1",
    summary:
      "Una técnica para volver al presente cuando la ansiedad te lleva a otro lado.",
    body: `Cuando sientas que estás "fuera de ti", o muy ansiosa/o, prueba este ejercicio. Te trae al cuerpo y al ahora:

- **5 cosas que puedes ver** — mira alrededor y nómbralas en silencio o en voz alta.
- **4 cosas que puedes tocar** — la tela de tu ropa, el respaldo de la silla, tu pelo.
- **3 cosas que puedes escuchar** — un auto lejos, un electrodoméstico, tu propia respiración.
- **2 cosas que puedes oler** — si no hay nada, imagínalo.
- **1 cosa que puedes saborear** — el café, el agua, tu propia boca.

Hazlo despacio. Toma uno o dos minutos. No es magia, es un anclaje.`,
  },
  {
    slug: "estres-academico",
    tag: "Estudio",
    title: "Cuando el estudio te aplasta",
    summary:
      "Estrategias prácticas para la sobrecarga de la U o el cole.",
    body: `Universidad e instituto pueden ser brutales. No es que seas frágil; el sistema empuja fuerte.

Algunas cosas que ayudan:

- Divide cada tarea grande en pasos de 25 minutos. Un Pomodoro a la vez.
- Estudiar más horas no es estudiar mejor. Descansos cortos cada 25-50 min.
- Distingue entre lo importante y lo urgente. No todo merece pánico.
- Pide ayuda cuando algo no se entiende. La vergüenza cuesta más que preguntar.
- Duerme antes que estudiar madrugadas. La memoria consolida durmiendo.

Si sientes que te ahogas, casi todas las universidades en Chile tienen apoyo psicológico gratuito para estudiantes. Úsalo.`,
  },
];

export function getTipBySlug(slug: string) {
  return tips.find((t) => t.slug === slug);
}
