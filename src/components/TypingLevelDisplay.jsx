import { useEffect, useState } from 'react';
import LevelProgress from './Level/LevelProgress';

export default function TypingLevelDisplay({
  level,
  levels,
  onComplete,
  darkMode = false
}) {
  const [typedText, setTypedText] = useState('');
  const [targetText, setTargetText] = useState(level.textSamples[0]);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false); // Nuevo estado

  useEffect(() => {
    if (typedText === targetText && !levelCompleted) {
      setLevelCompleted(true); // Marcar el nivel como completado
      onComplete?.({
        wpm,
        accuracy: calculateAccuracy(typedText, targetText),
        perfect: typedText === targetText
      });
    }
  }, [typedText, targetText, wpm, onComplete, levelCompleted]);

  // Calcula WPM
  // Calcula WPM
  useEffect(() => {
    if (typedText.length === 1) setStartTime(Date.now()); // Inicia el tiempo al escribir el primer carácter
    if (typedText.length > 0 && startTime) {
      const elapsedTime = (Date.now() - startTime) / 60000; // Tiempo transcurrido en minutos
      if (elapsedTime > 0) { // Asegurarse de que el tiempo transcurrido sea mayor que 0
        const words = typedText.length / 5; // Palabras basadas en caracteres escritos correctamente
        setWpm(Math.round(words / elapsedTime)); // Calcula WPM dinámicamente
      } else {
        setWpm(0); // Si el tiempo es demasiado pequeño, muestra 0 WPM
      }
    }
  }, [typedText, startTime]);

  // Manejo de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      const expectedChar = targetText[typedText.length];

      // Prevent space key from triggering default actions (like button clicks)
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
      }

      if (e.key === expectedChar) {
        setTypedText(prev => prev + e.key);
      } else if (e.key === 'Backspace') {
        setTypedText(prev => prev.slice(0, -1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedText, targetText]);

  // Verificar completado
  useEffect(() => {
    if (typedText === targetText && !levelCompleted) {
      setLevelCompleted(true); // Marcar el nivel como completado
      onComplete?.({
        wpm,
        accuracy: calculateAccuracy(typedText, targetText),
        perfect: typedText === targetText
      });
    }
  }, [typedText, targetText, wpm, onComplete, levelCompleted]);

  useEffect(() => {
    // Actualizar el texto objetivo cuando el nivel cambie
    setTargetText(level.textSamples[0]);
    setTypedText(''); // Reiniciar el texto escrito
    setLevelCompleted(false); // Reiniciar el estado de nivel completado
    setStartTime(null); // Reiniciar el tiempo de inicio
    setWpm(0); // Reiniciar WPM
  }, [level]);

  const calculateAccuracy = (typed, target) => {
    return Math.round((typed.length / target.length) * 100);
  };

  return (
    <div className={`typing-level-display ${darkMode ? 'dark' : ''}`}>
      <LevelProgress currentLevel={level} levels={levels} />

      {/* Área de texto interactiva */}
      <div className="typing-area">
        {targetText.split('').map((char, index) => {
          let state = '';
          if (index < typedText.length) {
            state = typedText[index] === char ? 'correct' : 'incorrect';
          } else if (index === typedText.length) {
            state = 'current';
          }
          return (
            <span
              key={index}
              className={`char ${state}`}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Teclas objetivo */}
      <div className="target-keys-row">
        <div className="target-keys">
          {level.targetKeys?.map((key) => (
            <kbd key={key} className={`key ${typedText.includes(key) ? 'active' : ''}`}>
              {key.toUpperCase()}
            </kbd>
          ))}
        </div>
        {wpm > 0 && ( // Mostrar estadísticas solo si el usuario ha comenzado a escribir
          <div className="stats">
            <span>Speed: {wpm}wpm</span>
            <span>Accuracy: {calculateAccuracy(typedText, targetText)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}