export const achievements = [
  {
    id: 'home-row-1',
    name: 'Primeros Pasos',
    description: 'Completa el nivel 1 de Home Row',
    condition: (completedLevels) => completedLevels.includes(1),
    icon: '🏁'
  },
  {
    id: 'home-row-master',
    name: 'Maestro de Home Row',
    description: 'Completa todos los niveles de Home Row',
    condition: (completedLevels) =>
      [...Array(15).keys()].every(i => completedLevels.includes(i + 1)),
    icon: '🏆'
  },
  {
    id: 'no-errors',
    name: 'Precisión Perfecta',
    description: 'Completa cualquier nivel sin errores',
    condition: (_, stats) => stats.perfectLevels > 0,
    icon: '🎯'
  },
  {
    id: 'speed-demon',
    name: 'Demonio de la Velocidad',
    description: 'Alcanza 60 WPM en cualquier nivel',
    condition: (_, stats) => stats.maxWPM >= 60,
    icon: '⚡'
  },
  {
    id: 'combo-master',
    name: 'Maestro de Combos',
    description: 'Realiza 10 combos perfectos',
    condition: (_, stats) => stats.perfectCombos >= 10,
    icon: '🎮'
  }
];