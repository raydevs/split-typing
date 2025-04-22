/*
Tipos de Ejercicios:

Repetición: Fortalece memoria muscular
Alternancia: Mejora coordinación entre manos
Combos: Prepara para shortcuts reales
Texto Real: Prepara para uso cotidiano

Dificultad Progresiva:

Nivel	Teclas	WPM Objetivo	Errores Permitidos
1-5	  1-2	    20	          5-8
6-15	4-8	    30-50	        3-5
16-30	Todas	  50-70	        1-3

*/

export const levels = {
  home: [
    {
      id: 1,
      name: "Índices Fundamentales",
      description: "F-J (posición inicial)",
      targetKeys: ["f", "j"],
      textSamples: ["ff jj ff jj", "fjfj fjfj", "f j f j f j"],
      fingerMap: { f: "left-index", j: "right-index" },
      allowedErrors: 5,
      group: "home"
    },
    {
      id: 2,
      name: "Dedos Medios",
      description: "D-K (coordinación central)",
      targetKeys: ["d", "k"],
      textSamples: ["dd kk dd", "dkdk dkdk", "d k d k d"],
      fingerMap: { d: "left-middle", k: "right-middle" },
      allowedErrors: 5,
      group: "home"
    },
    {
      id: 3,
      name: "Anulares",
      description: "S-L (fortalece dedos débiles)",
      targetKeys: ["s", "l"],
      textSamples: ["ss ll ss", "slsl slsl", "s l s l s"],
      fingerMap: { s: "left-ring", l: "right-ring" },
      allowedErrors: 6,
      group: "home"
    },
    {
      id: 4,
      name: "Meñiques",
      description: "A-Ñ (precisión en bordes)",
      targetKeys: ["a", "ñ"],
      textSamples: ["aa ññ aa", "añ añ añ", "a ñ a ñ"],
      fingerMap: { a: "left-pinky", ñ: "right-pinky" },
      allowedErrors: 8, // Más tolerancia por dificultad
      group: "home"
    },
    {
      id: 5,
      name: "Mano Izquierda Completa",
      description: "A-S-D-F (patrones simples)",
      targetKeys: ["a", "s", "d", "f"],
      textSamples: ["asdf asdf", "adsf adfs", "a sd f as df"],
      fingerMap: { a: "pinky", s: "ring", d: "middle", f: "index" },
      allowedErrors: 10,
      group: "home"
    },
    {
      id: 6,
      name: "Mano Derecha Completa",
      description: "J-K-L-Ñ (enfoque en meñique)",
      targetKeys: ["j", "k", "l", "ñ"],
      textSamples: ["jklñ jklñ", "kjlñ kjlñ", "j kl ñ jk lñ"],
      allowedErrors: 10,
      group: "home"
    },
    {
      id: 7,
      name: "Alternancia Básica",
      description: "F-J con espacios",
      targetKeys: ["f", "j", " "],
      textSamples: ["f j f j", "ff jj ff", "fj fj fj"],
      specialInstructions: "Usa pulgar derecho para espacios",
      group: "home"
    },
    {
      id: 8,
      name: "Bigramas Comunes",
      description: "FD-JK (transición suave)",
      targetKeys: ["f", "d", "j", "k"],
      textSamples: ["fd jk fd", "df kj df", "f d j k"],
      comboPractice: true,
      group: "home"
    },
    {
      id: 9,
      name: "Errores Frecuentes",
      description: "AS-ÑL (meñiques débiles)",
      targetKeys: ["a", "s", "ñ", "l"],
      textSamples: ["as ñl as", "sa lñ sa", "a ñ s l"],
      difficulty: "hard",
      group: "home"
    },
    {
      id: 10,
      name: "Velocidad Controlada",
      description: "DF-JK (ritmo constante)",
      targetKeys: ["d", "f", "j", "k"],
      textSamples: ["df jk ".repeat(5), "fd kj ".repeat(5)],
      wpmTarget: 30,
      group: "home"
    },
    {
      id: 11,
      name: "Palabras Cortas",
      description: "Uso realista (es, la, sí)",
      targetKeys: ["a", "s", "d", "f", "j", "k", "l", "ñ"],
      textSamples: ["así las añad", "sal fad jala", "la ñaf según"],
      realWords: true,
      group: "home"
    },
    {
      id: 12,
      name: "Trigramas",
      description: "ASD-JKL (coordinación)",
      targetKeys: ["a", "s", "d", "j", "k", "l"],
      textSamples: ["asd jkl asd", "sad lks sad"],
      comboPractice: true,
      group: "home"
    },
    {
      id: 13,
      name: "Home Row + Espacios",
      description: "Todas las teclas + ritmo",
      targetKeys: ["a", "s", "d", "f", "j", "k", "l", "ñ", " "],
      textSamples: ["as df jk lñ ", "a sd fj kl ñ ", "asdf jklñ asdf"],
      wpmTarget: 40,
      group: "home"
    },
    {
      id: 14,
      name: "Contracción Digital",
      description: "Ejercicio de resistencia",
      textSamples: ["asdfjklñ ".repeat(8), "ñlkjfdsa ".repeat(8)],
      endurance: true,
      group: "home"
    },
    {
      id: 15,
      name: "Maestría Home Row",
      description: "Texto realista solo con home row",
      textSamples: [
        "la salsa añade algo especial",
        "las llaves falsas jaden"
      ],
      realText: true,
      wpmTarget: 50,
      group: "home"
    }
  ],
  top: [
    {
      id: 16,
      name: "Top - Índices",
      description: "R-U (posición inicial)",
      targetKeys: ["r", "u"],
      textSamples: ["rr uu rr", "ru ru ru", "r u r u"],
      fingerMap: { r: "left-index", u: "right-index" },
      group: "top"
    },
    // ... (Patrón similar para niveles 17-29)
    {
      id: 30,
      name: "Maestría Top Row",
      description: "Programación básica",
      textSamples: [
        "return true; const url = ''",
        "query { user(id: 1) { name } }"
      ],
      programming: true,
      group: "top"
    },
  ],
  bottom: [
    {
      id: 31,
      name: "Bottom - Índices",
      description: "V-M (coordinación baja)",
      targetKeys: ["v", "m"],
      textSamples: ["vv mm vv", "vm vm vm", "v m v m"],
      fingerMap: { v: "left-index", m: "right-index" }
    },
    // ... (Niveles 32-44 progresivos)
    {
      id: 45,
      name: "Thumb Ninja",
      description: "Combos avanzados",
      targetKeys: [" ", "enter", "shift", "ctrl", "alt"],
      textSamples: [
        "ctrl+c ctrl+v ".repeat(4),
        "shift+alt+→ ".repeat(3)
      ],
      combos: true,
      specialInstructions: "Usa capas para accesos rápidos",
      group: "bottom"
    }
  ]
};